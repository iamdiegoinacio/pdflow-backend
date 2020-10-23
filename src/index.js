const express = require('express')
const app = express()
const router = require('./router')
const path = require('path')

//body parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')))

app.listen(3000, () => {
  console.log('Server open in http://localhost:3000')
})
