# Portfolio Backend Server

Express.js server with Socket.io for real-time features.

## Features

- Real-time visitor tracking with Socket.io
- Contact form API endpoint
- Rate limiting and security headers
- CORS configuration
- Health check endpoint
- Statistics API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/stats` - Get visitor statistics
- `POST /api/contact` - Submit contact form

## Socket.io Events

### Client → Server
- `connection` - Client connects
- `disconnect` - Client disconnects
- `message` - Send custom message

### Server → Client
- `visitorCount` - Total visitor count
- `onlineUsers` - Number of online users
- `newVisitor` - New visitor notification
- `newContact` - New contact form submission

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `MONGODB_URI` - MongoDB connection string (optional)
- `SMTP_*` - Email configuration (optional)

