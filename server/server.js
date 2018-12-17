const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');    

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room Name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //socket.emit from Admin
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //socket.broadcast.emit from Admin    
        socket.broadcast.to(params.room).emit(generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    //callback for acknowledgement
    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);  

        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();        
    });

    socket.on('createLocationMessage', (coords) => {
        //console.log('createMessage', newMessage);  

        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        callback('This is from the server');        
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
