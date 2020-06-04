// importing for basic express server
let express = require('express');
let app = express();
let http = require('http').Server(app);

// importing for io socket
let io = require('socket.io')(http);

// default route for server
app.use(express.static(path.join(__dirname, 'public')));

// we will use this route to send message
app.get('/send-message', (req, res) => {
    socket.emit
});

let totalUsers = 0;

// listening to the socket for connect event.
io.on('connection', (socket) => {

    let addUser = false;

    // listening to addition of users on server
    socket.on('add user', (username) => {
        if(addUser) return;

        // storing username in the socket session
        socket.username = username;
        ++totalUsers;
        addUser = true;

        // this informs the socket that new user is added
        socket.emit('login', {
            numUsers: totalUsers,
        });

        // broadcast to all people that user has been added
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: totalUsers
        });

    });

    // listening to messages on server
    socket.on('new message', (data) => {
        // this new message event returns data as parameter which stores the details of message
        // you can find this in documentation
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data,
        });
    });

    // listening to disconnect event on the socket
    socket.on('disconnect', () => {
        console.log('A user is disconnected');
    });
});

// starting the server on port 3000
http.listen(3000, () => {
    console.log('server started...');
});