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

io.on('connection', (socket) => {
    console.log('Users connected')
    socket.username = 'Anon'
    socket.id       = uuid.v4()

    console.log("Welcome: " + socket.username + '! ID: ' + socket.id)

    socket.on('chat', message => {
        console.log('From client: ', message)
        io.emit('chat', message)
    })

    socket.on('disconnect', () => {
        console.log('User: Disconnected...')
    })
});