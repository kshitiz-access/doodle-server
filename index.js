const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors({origin: CLIENT_URL}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: CLIENT_URL } });

// Server-side room storage
const roomCanvases = new Map();

io.on("connection", (socket) => {
    console.log("Socket.io Server connected");
    
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
        
        // Send existing canvas to new user
        if (roomCanvases.has(roomId)) {
            socket.emit('loadCanvas', roomCanvases.get(roomId));
        }
    });
    
    // Save canvas state when stroke completes
    socket.on('saveCanvas', (data) => {
        const { roomId, canvasData } = data;
        roomCanvases.set(roomId, canvasData);
    });
    
    socket.on('beginPath', (arg)=>{
        if (arg.roomId) {
            socket.to(arg.roomId).emit('beginPath', arg);
        } else {
            socket.broadcast.emit('beginPath', arg);
        }
    });
    socket.on('drawLine', (arg)=>{
        if (arg.roomId) {
            socket.to(arg.roomId).emit('drawLine', arg);
        } else {
            socket.broadcast.emit('drawLine', arg);
        }
    });
    socket.on('changeConfig', (arg)=>{
        if (arg.roomId) {
            socket.to(arg.roomId).emit('changeConfig', arg);
        } else {
            socket.broadcast.emit('changeConfig', arg);
        }
    });    
    socket.on('menuClick', (arg)=>{
        if (arg.roomId) {
            socket.to(arg.roomId).emit('menuClick', arg);
        } else {
            socket.broadcast.emit('menuClick', arg);
        }
    });
    socket.on('undoClick', (arg) => {
        if (arg.roomId) {
            socket.to(arg.roomId).emit('undoClick', arg);
        } else {
            socket.broadcast.emit('undoClick', arg);
        }
    });
    socket.on('redoClick', (arg) => {
        if (arg.roomId) {
            socket.to(arg.roomId).emit('redoClick', arg);
        } else {
            socket.broadcast.emit('redoClick', arg);
        }
    });
});

httpServer.listen(PORT, () => {
    console.log(`Express Server running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`CORS enabled for: ${CLIENT_URL}`);
});