# pdf-creator
_Criado por: Renato pereira_

## Sobre
API de geração automática de PDFs a partir de uma _URL_ e um _título_ informados na chamada da API feita em **Javascript**

## Endpoints

### POST /pdf
Rota responsável pro recuperar os dados para geração do PDF e retorná-lo através de um link que será enviado como JSON

#### Parâmetros

1. _url_ (obrigatório): Indica de qual site deve ser criado o resumo para a geração do PDF
2. _pdfTitle_ (obrigatório): Indica qual o título deve ser colocado no cabeçalho do PDF que será criado

#### Respostas

##### 200 OK
Esta resposta retornará um JSON com oo campo _pdfUrl_ que seu valor será a URL de acesso ao pdf criado

##### 400 Bad Request
Esta resposta será dada caso um dos parâmetros que foram solicitados não sejam enviados

##### 500 Internal Server Error
Esta resposta será dada caso qualquer problema na geração do PDF acontecer
