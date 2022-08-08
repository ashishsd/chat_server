const express = require('express')
const http = require('http')
// const https = require('https')
// const fs = require('fs')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
// const path = require('path')
require('dotenv').config()

// import socket middlewares
const socketConnectMiddleware = require('./socket-middlewares/connection')
// import routes
const authRouts = require('./routes/auth')

module.exports = () => {
  const {
    PORT,
    MONGO_DB_HOST
  } = process.env
  const cors = require('cors')

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use('/api/auth', authRouts)

  // Connecting to the database
  mongoose.connect(MONGO_DB_HOST).then(() => {
    console.log('Successfully connected to the database')

    const httpServer = http.createServer(app)

    const io = new Server(httpServer, {
      cors: true
    })

    // invoke socket middlewares
    io.on('connection', socketConnectMiddleware)

    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
  })
}
