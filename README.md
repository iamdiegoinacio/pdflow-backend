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
