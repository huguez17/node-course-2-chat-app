var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@pepe.com',
    //     text: 'Hey, this is Hugo'
    // });

    // socket.on('newEmail', function(email) {
    //     console.log('New Email', email);
    // });

});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(messsage) {
    console.log('New Message', messsage);
});