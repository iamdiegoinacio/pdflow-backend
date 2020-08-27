const pdf = require('html-pdf')

const generatePDF = (html, src) => {
  return new Promise((resolve, reject) => {
    pdf.create(html).toFile(src, error => {
      error ? reject(error) : resolve()
    })
  })
}

module.exports = generatePDF
