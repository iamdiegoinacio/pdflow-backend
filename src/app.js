import express from 'express'
import router from './router'
import path from 'path'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io'
import { io as connect } from 'socket.io-client'

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

//socket io
const clientIO = connect('http://localhost:3000')
let date = new Date()
let requestQuantity = 0

io.on('connection', socket => {
  socket.emit('requestQuantity', {
    requestQuantity,
    canRequest: requestQuantity < 100
  })
})

clientIO.on('updateRequestQuantity', () => {
  requestQuantity++
  io.emit('requestQuantity', {
    requestQuantity,
    canRequest: requestQuantity < 100
  })
})

setInterval(() => {
  const actualDate = new Date()

  if (actualDate.getDate() != date.getDate()) {
    date = actualDate
    requestQuantity = 0

    io.emit('requestQuantity', {
      requestQuantity,
      canRequest: requestQuantity < 100
    })
  }
}, 60 * 1000)

//routes
app.use(router)
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')))

export default server
export { io }