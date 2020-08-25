const ejs = require('ejs')

function htmlGenerate(data, templateSRC, callback) {
  ejs.renderFile(templateSRC, {...data}, (error, html) => {
    if (error) {
      callback(null, error)
    } else {
      callback(html, null)
    }
  })
}

module.exports = htmlGenerate