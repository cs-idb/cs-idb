const collections = require('../data/collections.json')

module.exports = (req, res) => {
  res.json(collections)
}