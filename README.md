# Doodle Server

Real-time collaborative drawing server built with Node.js, Express, and Socket.IO.

## Features

- **Real-time Collaboration**: Multiple users can draw simultaneously
- **Room-based Sessions**: Private rooms with unique URLs
- **Canvas Persistence**: New users see existing drawings
- **Drawing Tools**: Pencil, eraser with customizable colors and sizes
- **Undo/Redo**: Synchronized across all users
- **CORS Support**: Configured for both development and production

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin resource sharing

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

## Environment

- **Development**: Accepts connections from `http://localhost:3000`
- **Production**: Configured for deployment on Railway/Render

## Socket Events

### Client → Server
- `joinRoom(roomId)` - Join a specific room
- `beginPath(data)` - Start drawing stroke
- `drawLine(data)` - Continue drawing stroke
- `undoClick(data)` - Undo last action
- `redoClick(data)` - Redo last action
- `saveCanvas(data)` - Save canvas state

### Server → Client
- `loadCanvas(data)` - Load existing canvas for new users
- `beginPath(data)` - Broadcast stroke start
- `drawLine(data)` - Broadcast stroke continuation
- `undoClick(data)` - Broadcast undo action
- `redoClick(data)` - Broadcast redo action

## Deployment

Ready for deployment on:
- Railway
- Render
- Heroku
- Any Node.js hosting platform

## License

MIT
