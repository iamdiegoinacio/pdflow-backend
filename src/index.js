const readline = require('readline-sync')
const searchInWikipedia = require('./functions/searchInWikipedia')
const htmlGenerate = require('./functions/htmlGenerate')
const generatePDF = require('./functions/generatePDF')
const textSummarize = require('./functions/textSummarize')

async function main() {
  const term = readline.question('Qual termo deseja procurar em kikipedia.org do Brasil? ')

  console.log(`\nProcurando pelo termo \"${term}\" em pt.wikipedia.org...\n`)

  try {
    var title = await searchInWikipedia(term.replaceAll(' ', '_'))
  } catch (error) {
    console.error('Erro ao procurar o termo em wikipedia.org do Brasil.')
  }

  if (title == undefined) {
    console.log(`O termo \"${term}\" não foi encontrado em Wikipedia.org.`)
  } else {
    console.log('Gerando resumo...\n')

    const { sm_api_content } = await textSummarize(`https://pt.wikipedia.org/wiki/${term.replaceAll(' ', '_')}`, 16)
    const textsArray = sm_api_content.split('[BREAK]')
    const data = {title, textsArray}

    console.log('Gerando arquivo PDF...\n')

    try {
      const html = await htmlGenerate(data, 'src\\template\\index.ejs')
      await generatePDF(html, `src\\pdfs\\${term.replaceAll(' ', '_').toLowerCase()}.pdf`)
      
      console.log('Arquivo PDF gerado com sucesso.\n')
    } catch (error) {
      console.error('Erro ao gerar PDF.\n')
    }
  }
}

main()
