const skins = require('../data/skins.json')

module.exports = (req, res) => {
  res.json(skins)
}