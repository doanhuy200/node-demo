// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 3000;
//
// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {
//
//     //Set the response HTTP header with HTTP status and Content type
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello test\n');
// });
//
// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });




// const socket = require("socket.io");
// const color = require("colors");
// const cors = require("cors");

// const express = require("express");
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");

// app.use(express());

const port = 3000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
});

server.listen(port, () => {
    console.log('listening on *:3000');
});

// app.use(cors());

// var server = app.listen(
//     port,
//     console.log(
//         `Server is running on the port no: ${(port)} `
//             .green
//     )
// );


// const io = socket(server);
//
// //initializing the socket io connection
// io.on("connection", (socket) => {
//     //for a new user joining the room
//     socket.on("joinRoom", ({ username, roomname }) => {
//         //* create user
//         const p_user = join_User(socket.id, username, roomname);
//         console.log(socket.id, "=id");
//         socket.join(p_user.room);
//
//         //display a welcome message to the user who have joined a room
//         socket.emit("message", {
//             userId: p_user.id,
//             username: p_user.username,
//             text: `Welcome ${p_user.username}`,
//         });
//
//         //displays a joined room message to all other room users except that particular user
//         socket.broadcast.to(p_user.room).emit("message", {
//             userId: p_user.id,
//             username: p_user.username,
//             text: `${p_user.username} has joined the chat`,
//         });
//     });
//
//     //user sending message
//     socket.on("chat", (text) => {
//         //gets the room user and the message sent
//         const p_user = get_Current_User(socket.id);
//
//         io.to(p_user.room).emit("message", {
//             userId: p_user.id,
//             username: p_user.username,
//             text: text,
//         });
//     });
//
//     //when the user exits the room
//     socket.on("disconnect", () => {
//         //the user is deleted from array of users and a left room message displayed
//         const p_user = user_Disconnect(socket.id);
//
//         if (p_user) {
//             io.to(p_user.room).emit("message", {
//                 userId: p_user.id,
//                 username: p_user.username,
//                 text: `${p_user.username} has left the chat`,
//             });
//         }
//     });
// });