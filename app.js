// Node.js & Express.js
const app  = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const uuid = require('uuid');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
    console.log(`Listening at http://localhost:${port}`);
});

// Socket.io
const io = require('socket.io')(http);

const users = [];

io.on('connection', (socket) => {
    let randId = uuid.v4();

    socket.username = 'Anon';
    socket.id       = randId;

    console.log("Welcome: " + socket.username + '! ID: ' + socket.id);

    users.push({username: socket.username, id: socket.id});

    socket.on('msg', (data) => {
        io.sockets.emit('msg', {message : data.message, username : socket.username});
    })

    socket.on('disconnect', () => {
        console.log('User: Disconnected...')
    })
});