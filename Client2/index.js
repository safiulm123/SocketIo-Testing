const io = require('socket.io-client');

// Initiating the connection
const socket = io('http://localhost:7777');

//Function for connected port
socket.on('connect',()=>{
    console.log(socket.connected)
})

socket.emit('Send Message',"This is crazy")

socket.on("Test Message", (data)=>{
    console.log(data)
})
socket.on('hi',(data)=>{
    console.log(data)
})
