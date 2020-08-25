const puppeteer = require('puppeteer')

async function searchInWikipedia(term = '') {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`https://pt.wikipedia.org/wiki/${term}`)

  const pageData = await page.evaluate(() => {
    const node = document.querySelectorAll('.mw-parser-output p')

    if (node.length == 0) {
      return undefined
    } else {
      const h1 = document.querySelector('#firstHeading').textContent

      return h1
    }
  })

  return pageData
}

module.exports = searchInWikipedia