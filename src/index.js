const readline = require('readline-sync')
const searchInWikipedia = require('./functions/searchInWikipedia')
const htmlGenerate = require('./functions/htmlGenerate')
const generatePDF = require('./functions/generatePDF')
const textSummarize = require('./functions/textSummarize')

async function main() {
  const term = readline.question('Qual termo deseja procurar em Wikipedia.org? ')

  console.log(`Procurando pelo termo \"${term}\" em pt.wikipedia.org...`)
  const title = await searchInWikipedia(term.replace(' ', '_'))

  if (title == undefined) {
    console.log(`O termo \"${term}\" não foi encontrado em Wikipedia.org.`)
  } else {
    console.log('Gerando resumo...')
    const { sm_api_content } = await textSummarize(`https://pt.wikipedia.org/wiki/${term.replace(' ', '_')}`, 16)
    const textsArray = sm_api_content.split('[BREAK]')
    const data = {title, textsArray}

    console.log('Gerando arquivo PDF...')
    htmlGenerate(data, 'src\\template\\index.ejs', (html, error) => {
      if (error) {
        console.error('Erro ao gerar o HTML')
      } else {
        generatePDF(html, `src\\pdfs\\${term.replace(' ', '_').toLowerCase()}.pdf`, error => {
          if (error) {
            console.log('Erro ao gerar o PDF.')
          } else {
            console.log('arquivo PDF gerado com sucesso.')
          }
        })
      }
    })
  }
}

main()
