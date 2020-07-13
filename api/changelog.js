const changelog = require('../data/changelog.json')

module.exports = (req, res) => {
  res.json(changelog)
}