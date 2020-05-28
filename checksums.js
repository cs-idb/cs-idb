const fs = require('fs')
const sha1 = require('js-sha1')
const OUTPUT_FILE_NAME = 'checksums.json'

let sums = []

function loadFiles () {
  console.log('Loading files...')
  return new Promise(resolve => {
    fs.readdir('data/', async (err, files) => {
      if (err) {
        console.error('Could not read data/', err)
        process.exit(1)
      }

      const promises = []
      files.forEach(file => {
        if (file !== OUTPUT_FILE_NAME) {
          promises.push(hashFile(file))
        }
      })
      await Promise.all(promises)
      resolve()
    })
  })
}

async function hashFile (file) {
  console.log('HashFile:', file)
  const content = await getFileContent(file)
  const hash = await sha1(content)
  const name = file.split('.')[0]
  sums.push({
    name, hash
  })
  console.log('hashfile done', file)
}

async function getFileContent (file) {
  return new Promise(resolve => {
    fs.readFile(`data/${file}`, (err, data) => {
      if (err) {
        console.error(`Could not read data/${file}: `, err)
        process.exit(1)
      }
      resolve(data)
    })
  })
}

async function writeToFile () {
  return new Promise(resolve => {
    fs.writeFile(`data/${OUTPUT_FILE_NAME}`, JSON.stringify(sums), err => {
      if (err) {
        console.error(`Error writing to file: ${err}`)
        process.exit(1)
      }
      resolve()
    })
  })
}

async function run() {
  console.log('Starting checksum process...')
  await loadFiles()
  console.log('Writing to file...')
  await writeToFile()
  console.log(`Checksums were written to data/${OUTPUT_FILE_NAME}!`)
}

run()