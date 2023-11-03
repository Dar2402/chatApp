// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors()); // Add cors middleware

// const server = http.createServer(app);


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })



// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//     },
// });


// const chatBot = 'ChatBot';
// let allUsers = [];
// let chatRoom = '';



// io.on('connection', (socket) => {
//     console.log(`User Connected ${socket.id}`);



//     socket.on('join_room', (data) => {
//         const {userName, room } = data;
//         socket.join(room);


//         let __CreatedTime__ = Date.now();


//         socket.to(room).emit('receive_message', {
//             message: `${userName}`,
//             __CreatedTime__,
//         })


//         socket.emit('receive_message', {
//             message: `You Joined Room ${room}. Welcome to the ChatRoom ${userName}`,
//             userName: chatBot,
//             __CreatedTime__,
//         })


//         chatRoom = room;
//         allUsers.push({ id: socket.id, userName, room });
//         chatRoomUsers = allUsers.filter((user) => user.room === room);
//         socket.to(room).emit("chatroom_users", chatRoomUsers);
//         socket.emit("chatroom_users", chatRoomUsers);
//     })
// })

// server.listen(4000, () => "Server is running on port 4000");
// //==================================================================================================================================================


