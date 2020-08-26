const ejs = require('ejs');

const htmlGenerate = (data, templateSRC, callback) => {
  ejs.renderFile(templateSRC, {...data}, (error, html) => {
    error ? callback(null, error) : callback(html, null)
  });
};

module.exports = htmlGenerate
