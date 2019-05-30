const io = require("socket.io-client");

// Initiating the connection
const socket = io("http://localhost:7777");

// Subscribe to the channel
socket.on("Test", data => {
  console.log(data);
});
