const { request: req, response: res } = require('express')
const textSummarizeService = require('../services/textSummarizeService')
const htmlService = require('../services/htmlGeneratorService')
const pdfService = require('../services/pdfGeneratorService')
const path = require('path')

module.exports = {
  async create(request = req, response = res) {
    const {
      pdfTitle,
      url,
    } = request.body

    if (!pdfTitle || !url) {
      return response.status(400).json({ message: 'Insufficient data to generate the pdf' })
    }

    try {
      const { sm_api_content: data } = await textSummarizeService(url, 16)
      const textsArray = data.split('[BREAK]')
      const dataToCreatePDF = { title: pdfTitle, textsArray }

      try {
        const html = await htmlService(dataToCreatePDF, path.resolve(__dirname, '..', 'template', 'index.ejs'))

        const pdfName = `${Date.now()}-${pdfTitle.replace(/ /g, '_').toLowerCase()}.pdf`
        await pdfService(html, path.resolve(__dirname, '..', 'pdfs', pdfName))
        return response.json({ pdfUrl: `http://localhost:3000/pdfs/${pdfName}` })
      } catch (error) {
        return response.status(500).json({ message: 'Error generating pdf file' })
      }

    } catch({ status, message }) {
      return response.status(status).json({ message })
    }
  }
}
