// Node.js & Express.js
const app  = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const uuid = require('uuid');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
    console.log(`Listening on: http://localhost:${port}`);
});

// Socket.io server side

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.username = 'Anon'
    socket.id       = uuid.v4()

    console.log("Welcome: " + socket.username + '! ID: ' + socket.id)

    socket.on('chat', message => {
        io.emit('chat', {message, id: socket.id}) // Transferer chat message to all clients
    })

    socket.on('disconnect', () => {
        console.log('User: Disconnected...')
    })
});