import { raw_checksums, raw_collections, raw_rarities, raw_skins, raw_weapons, raw_paintkits } from '../stores'
import { get } from 'svelte/store'

async function baseFetch(name) {
  const url = '__BASE_API_URL__' + name
  const res = await fetch(url).catch(() => {
    throw new Error(`Error fetching ${name}...`)
  })
  const data = await res.json()
  return data
}

async function fetchCollections() {
  const data = await baseFetch('collections')
  raw_collections.set(data)
}

async function fetchRarities() {
  const data = await baseFetch('rarities')
  raw_rarities.set(data)
}

async function fetchWeapons() {
  const data = await baseFetch('weapons')
  raw_weapons.set(data)
}

async function fetchSkins() {
  const data = await baseFetch('skins')
  raw_skins.set(data)
}

async function fetchPaintkits() {
  const data = await baseFetch('paintkits')
  raw_paintkits.set(data)
}

function fetchDataByNames(raw_checksums) {
  let checksum_counter = 0
  const amount_of_checksums = raw_checksums.length

  return new Promise(resolve => {
    if (amount_of_checksums === 0) resolve()

    raw_checksums.forEach(async checksum => {
      const { name, hash } = checksum
      await fetchDataByName(name, hash)
      checksum_counter++
      if (checksum_counter === amount_of_checksums) resolve()
    })
  })
}

async function fetchDataByName(name, hash) {
  if (name === 'collections') await fetchCollections()

  if (name === 'rarities') await fetchRarities()

  if (name === 'weapons') await fetchWeapons()

  if (name === 'paintkits') await fetchPaintkits()

  if (name === 'skins') await fetchSkins()

  changeLocalHash(name, hash)
}

function changeLocalHash(name, hash) {
  const current_checksums = get(raw_checksums) || []

  const checksum = current_checksums.find(c => c.name === name)
  if (checksum) {
    checksum.hash = hash
  } else {
    current_checksums.push({ name, hash })
  }

  raw_checksums.set(current_checksums)
}

export { fetchDataByNames }
