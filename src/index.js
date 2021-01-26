import express from 'express'
import router from './router'
import path from 'path'

//express instance
const app = express()

//body parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use(router)
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')))

//starting server
app.listen(3000, () => {
  console.log('Server open in http://localhost:3000')
})
