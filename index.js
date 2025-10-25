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

httpServer.listen(5000, console.log("Express Server running on port 5000"));