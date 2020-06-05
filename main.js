// html page will use the functions below to send data to the webserver

$(function () {
    var socket = io();

    const setUsername = () => {
        // fires the add user event

        // will define username later
        socket.emit('add user', username);
    }

    const addIntroMessage = (data) => {
        var message = '';
        // check numUsers for number of users. numUsers in defined in index.js
        if (data.numUsers === 1) {
            message += "There's only one participant right now."
        }
        else {
            message += "There are " + data.numUsers + " participants";
        }
    }

    const sendMessage = () => {
        if (message && connected) {
            // fires the new message event
            socket.emit('new message', message);
        }
    }
})