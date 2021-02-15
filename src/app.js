import express from 'express'
import router from './router'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io'

//.env config
dotenv.config({ path: path.join(__dirname, '..', '.env') })

//server instance
const app = express()
const server = http.Server(app)
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
})

//initializing cors
app.use(cors())

//body parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

io.on('connection', socket => {
  socket.emit('Hello', {
    arg: 'Hello world'
  })
})

//routes
app.use(router)
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')))

export default server