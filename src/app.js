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

export default app
