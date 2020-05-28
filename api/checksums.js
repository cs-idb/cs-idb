const checksums = require('../data/checksums.json')

module.exports = (req, res) => {
  res.json(checksums)
}