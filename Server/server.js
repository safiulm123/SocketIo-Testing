// Initializing Express
const express = require("express");
const app = express();

// Initializing Redis
var redis = require("redis");

// Creating Server for Socket.io
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

//Enabling port to listen for traffic
server.listen(process.env.PORT || 7777);
console.log("Server listening for traffic...");

io.sockets.on('connection', function(socket) {
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('room', function(room) {
      socket.join(room);
  });
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');