const onMessageMiddleware = require('./onMessage')
const onDisconnect = require('./onDisconnect')

module.exports = (socket) => {
  console.log(`User connection id ${socket.id}`)
  socket.on('message', onMessageMiddleware)
  socket.on('disconnect', onDisconnect)
}
