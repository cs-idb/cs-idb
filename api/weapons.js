const weapons = require('../data/weapons.json')

module.exports = (req, res) => {
  res.json(weapons)
}