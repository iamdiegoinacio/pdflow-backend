import express from 'express'
import router from './router'
import path from 'path'
import dotenv from 'dotenv'

//.env config
dotenv.config({ path: path.join(__dirname, '..', '.env') })

//express instance
const app = express()

//body parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use(router)
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')))

//starting server
const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(`Server open in http://localhost:${port}/`)
})
