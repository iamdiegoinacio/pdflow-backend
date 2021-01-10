const pdf = require('html-pdf')

const pdfGeneratorService = (html, src) => {
  return new Promise((resolve, reject) => {
    pdf.create(html).toFile(src, error => {
      error ? reject(error) : resolve()
    })
  })
}

module.exports = pdfGeneratorService
