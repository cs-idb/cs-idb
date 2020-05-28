const paintkits = require('../data/paintkits.json')

module.exports = (req, res) => {
  res.json(paintkits)
}