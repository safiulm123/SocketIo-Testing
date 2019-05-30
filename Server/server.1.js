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

// Using Namespace
const nsp = io.of("/my-namespace");

//Initializing an Array to keep track of all the sockets
Connections = [];
//Starting IO connection
io.sockets.on("connection", function(socket) {
  Connections.push(socket);
  console.log("Connected: %s sockets connected", Connections.length);

  socket.on("Send Message", function(data) {
    console.log(data);
  });

  socket.emit("Test Message", "This is a crazy World");
});

// Using namespace
nsp.on("connection", function(socket) {
  console.log("someone created");
  nsp.emit("hi", "everyone!");
});

//---------------------------------------------------------------------------------
//                              REDIS PUBSUB
//---------------------------------------------------------------------------------
// Initializing Publisher
const Publisher = redis.createClient();

//Publishing a request
Publisher.publish("notification", "Is this working!!!", function() {
  // process.exit(0);
});
//---------------------------------------------------------------------------

//
//Setting Variables for Channel Name
let ChannelName = "";

io.sockets.on("connection", socket => {
  Connections.push(socket);
  console.log("Connected: %s sockets connected", Connections.length);

  socket.on("Channel Name", data => {
    console.log(data);
    ChannelName = data;

    socket.emit(ChannelName, "Crazy");
    socket.emit("Test", "This is stupid");
  });
});
