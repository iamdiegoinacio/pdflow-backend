const pdf = require('html-pdf')

const generatePDF = (html, src, callback) => {
  pdf.create(html).toFile(src, error => {
    error 
    ? callback(error)     
    : callback()
  });
};

module.exports = generatePDF
