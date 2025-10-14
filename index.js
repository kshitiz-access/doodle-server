const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const app = express();
const isDev = app.settings.env === 'development';
const URL = isDev ? 'http://localhost:3000' : 'https://doodle-swart.vercel.app/'
app.use(cors({origin: URL}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
    console.log("Socket.io Server connected");
    socket.on('beginPath', (arg)=>{
        socket.broadcast.emit('beginPath', arg);
    });
    socket.on('drawLine', (arg)=>{
        socket.broadcast.emit('drawLine', arg);
    });
    socket.on('changeConfig', (arg)=>{
        socket.broadcast.emit('changeConfig', arg);
    });    
    socket.on('menuClick', (arg)=>{
        socket.broadcast.emit('menuClick', arg);
    });
    socket.on('undoClick', (arg) => {
        socket.broadcast.emit('undoClick', (arg));
    });
    socket.on('redoClick', (arg) => {
        // Broadcast the event to all connected clients, excluding the sender
        socket.broadcast.emit('redoClick', (arg));
    });
});

httpServer.listen(5000, console.log("Express Server running on port 5000"));