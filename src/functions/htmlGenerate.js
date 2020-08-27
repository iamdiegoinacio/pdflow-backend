const ejs = require('ejs');

const htmlGenerate = (data, templateSRC) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templateSRC, {...data}, (error, html) => {
      error ? reject(error) : resolve(html)
    })
  })
}

module.exports = htmlGenerate
