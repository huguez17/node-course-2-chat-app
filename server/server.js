const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    //socket.emit from Admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //socket.broadcast.emit from Admin    
    socket.broadcast.emit(generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);  

        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        // socket.broadcast.emit('newMessage', {
        //      from: newMessage.from,
        //      text: newMessage.text,
        //      createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
