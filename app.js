// Node.js & Express.js
const express = require('express')
const app     = express()
const http    = require('http').Server(app)
const port    = process.env.PORT || 3000
const path    = require('path')

app.use(express.static(path.join(__dirname + '/public')))

http.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});

// Socket.io server side
const io   = require('socket.io')(http)
const uuid = require('uuid')

const users = {}

io.on('connection', socket => {
    socket.username = 'Anon'
    socket.id       = uuid.v4()

    socket.on('new-user', name => {
        socket.broadcast.emit('user-connected', name)
        users[socket.id] = name
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })

    socket.on('chat-send', message => {
        socket.broadcast.emit('chat-msg', {message:message, name:users[socket.id]})
    })
});