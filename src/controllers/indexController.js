const { request: req, response: res } = require('express')

module.exports = {
  index(request = req, response = res) {
    return response.json({ message: 'This is an automatic PDF generation API created by Renato Pereira. Visit my Github: https://github.com/renatodev17/' })
  }
}
