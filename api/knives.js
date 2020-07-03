const knives = require('../data/knives.json')

module.exports = (req, res) => {
  res.json(knives)
}