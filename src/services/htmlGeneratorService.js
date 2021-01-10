const ejs = require('ejs');

const htmlGeneratorService = (data, templateSRC) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templateSRC, {...data}, (error, html) => {
      error ? reject(error) : resolve(html)
    })
  })
}

module.exports = htmlGeneratorService
