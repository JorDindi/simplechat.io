const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Emoji = require('emoji-js');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

const sockets = [];

io.on('connection', socket => {
    sockets.push(socket);

    socket.on('send message', data => {
        const { username, message } = data;
        const emoji = new Emoji();
        const renderedMessage = emoji.replace_unified(message);
        const timestamp = new Date().toLocaleString();
        io.emit('new message', { username, message: renderedMessage, timestamp });
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
