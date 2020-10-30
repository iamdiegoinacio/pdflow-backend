# pdf-creator
_Criado por: Renato pereira_

## Descrição
API de geração automática de PDFs a partir de uma _URL_ e um _título_ informados na chamada da API feita em **Javascript**

## Sobre
Projeto criado para ajuda de alunos, professores, entre outros, para que eles possam ter rapidamente uma base para algo mais complexo.

## Estrutura do projeto
Dentro da pasta `src` temos as pastas `controllers`, `functions`, `pdfs`, `template` e os arquivos `index.js` e `router.js`.

### Arquivo `Index`
No arquivo `index` temos, apenas, as configurações básicas do express e a importação do arquivo de rotas (`router.js`) da aplicação e uma rota
única que retorna os arquivos pdf criados nas requisições a API.

### Arquivo `Router`
No arquivo `router` temos a criação rotas da aplicação, importando as funções que são importadas dos controllers da pasta `controllers` que possuem as funcionalidades que serão executadas nas rotas.

### Pasta `Controllers`
A pasta `controllers` poussui dois arquivos: `indexController.js` e `pdfCreatorController.js`:

#### Aquivo `IndexController`
Este arquivo possui um objeto com uma função chamada `index()` que é chamada na rota índice da aplicação (rota `'/'`), retornando apenas um JSON com uma mensagem de saudações

#### Arquivo `pdfCreatorController`
Este arquivo possui um objeto com uma fnção chamada `create()` que é responsável pela geração do arquivo PDF. 

Essa função é chamada em uma rota do tipo **POST** chamada `/pdf`, e essa rota recebe dois parâmetros pelo corpo da requisição: `pdfTitle` e `url`.

O parâmetro `pdfTitle` é responsável por retornar o título que será adicionado ao PDF no momento da sua geração. E o parâmetro `url` retornará a URL do site de onde deve ser gerado o resumo para ser transformado em PDF.

Será feito uma análise simples para saber se os parâmetros foram enviados corretamente. Se sim, ele continuará com o fluxo normal, senão retornará um **STATUS 400 (BAD REQUEST)** com a mensagem: _"Insufficient data to generate the pdf"._

Após essa análise será feito a chamada a uma função chamada `textSummarize()`, encontrada na pasta `functions`, que gerará o resumo do texto. Esta função faz chamada a uma API da [**smmry.com**](smmry.com), uma API gratuita para geração de resumos. A requisição a API será feita usando a lib `axios` e será retornado o `data` do axios, e dele, na rota, será feito uma desestruturação do JSON para pegar apenas a propriedade `sm_api_content`. 

Entretando, se em `data` é retornado a propriedade `sm_api_error` no JSON, será feito um tratamento que pode retornar um **STATUS 400** ou um **STATUS 500 (INTERNAL SERVER ERROR)**. Será retornado o **STATUS 400** se na prorpiedade `sm_api_message`, que é retornada junto se a propriedade `sm_api_error` é retornada, tiver o valor _'THE PAGE IS IN AN UNRECOGNISABLE FORMAT'_. Senão, será retornado o **STATUS 500** junto com uma mensagem _'Error generating summary'_. O **STATUS 500** também será retornado caso qualquer outro tipo de erro acontecer.

Caso tudo funcione corretamente, retornando a propriedade `sm_api_content` para a rota, será criada uma nova variável que receberá um array com cada sentença do resumo criado. Cada sentença é separada por uma string _'[BREAK]'_ e essa string é passada como parâmetro no método `split()` para criar este array.

Em seguida é criado um objeto que recebe o título do PDF e o array de sentenças, que logo em seguida é passado como argumento para outra função que está na página `functions` chamada `htmlGenerate()`. Esta função é encarregada em transformar o título e as sentenças em uma string em formato HTML que logo depois será transformado em um arquivo PDF. E além do objeto ser passado como argumento, será passado o caminho template HTML em que o HTML será baseado: o arquivo `index.ejs`. **EJS** é uma lib que renderiza um HTML dinâmico baseado em um template. Então o template que está em `src/templates/index.ejs` é chamado e da lib **EJS** é chamado o método `renderFile()` que recebe o caminho para o template, os dados a serem renderizados e um callback que pode retornar um erro ou uma string como HTML gerado. Se houver algum erro na geração do HTML será retornado um **STATUS 500** com a mensagem _'Error generating pdf file'_.

Após a geração da string do HTML será criado um novo objeto do tipo `RegExp()` que servirá para remover os espaços do título do PDF e trocá-los por underlines (_). Após a criação desse objeto será criado o nome do arquivo PDF que estará na constante `pdfName`, em que o nome será a data atual em milissegundos junto com o título do PDF em que os espaços são separados por underlines.

Logo após isso, será chamada a última função que está na pasta `functions` chamada `generatePDF()` que recebe como argumento o HTML que foi gerado anteriormente e o caminho onde o arquivo será guardado junto com o nome do arquivo que foi criado logo acima.

Para finalmente gerar o PDF, será usado o método `create` da lib **html-pdf**, que recebe como argumento o HTML. E após a chamada desse método, logo em seguida será chamado o método `toFile()` que recebe o caminho onde será guardado o arquivo e também um callback que pode retornarar um erro. Se houver um erro, será retornado um **STATUS 500** com a mensagem _'Error generating pdf file'_.

Se o PDF foi criado com sucesso, será retornado um JSON com a propriedade `pdfUrl` para o acesso do arquivo que foi criado.

## Observações

* Para poder ser feito o teste da API em sua máquina, você deverá fazer uma conta no site da API usada para gerar os resumos, o site [**smmry.com**](smmry.com), para você gerar sua API KEY para realizar as chamadas para a API. A API possui um plano gratuito de 100 chamadas diárias. Após a criação de sua API KEY, na pasta `src`, crie a pasta `keys` com o arquivo `keys.json`, que terá dentro dele a propriedade `smmry_api_key`, que o valor dessa propriedade será sua API KEY
