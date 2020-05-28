const rarities = require('../data/rarities.json')

module.exports = (req, res) => {
  res.json(rarities)
}