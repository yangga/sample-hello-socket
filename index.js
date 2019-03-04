var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello Node!');
});

var server = require('http').createServer(app).listen(3000, function() {
    console.log(`Listening on port 3000 with http`);
});

const socketio = require('socket.io')
const io = socketio(server)
io.on('connection', (socket) => {
    console.log('Client connected');

    // echo received chat message
    socket.on('chat', function(msg){
        console.log('Recv chat:', msg)
        io.emit('chat', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected, clients: ', clientCnt);
    })
})
