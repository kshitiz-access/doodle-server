# Doodle Server

Real-time collaborative drawing server built with Node.js, Express, and Socket.IO.

## 🚀 Live Demo

**Try the app:** [https://doodle-app-gold.vercel.app](https://doodle-app-gold.vercel.app)

---

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

# Start production server
npm start

# Server runs on http://localhost:5000 (or PORT from environment)
```

## Environment Variables

Create a `.env` file in the root directory:

```bash
# Server port (Render sets this automatically)
PORT=5000

# Frontend URL for CORS (your Vercel frontend URL in production)
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

**Development:** Uses defaults if not set (`PORT=5000`, `CLIENT_URL=http://localhost:3000`)

**Production:** Set `CLIENT_URL` to your Vercel frontend URL (e.g., `https://your-app.vercel.app`)

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

### Render (Recommended)

See `DEPLOYMENT.md` for detailed step-by-step instructions.

**Quick Steps:**
1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables:
   - `CLIENT_URL` = Your Vercel frontend URL
   - `NODE_ENV` = `production`
4. Deploy

**Other Platforms:**
- Railway
- Heroku
- Any Node.js hosting platform

**Note:** Make sure to set `CLIENT_URL` environment variable to your frontend URL for CORS to work correctly.

## License

MIT
