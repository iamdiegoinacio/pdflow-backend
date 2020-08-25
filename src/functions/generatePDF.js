const pdf = require('html-pdf')

function generatePDF(html, src, callback) {
  pdf.create(html).toFile(src, error => {
    if (error) {
      callback(error)
    } else {
      callback()
    }
  })
}

module.exports = generatePDF