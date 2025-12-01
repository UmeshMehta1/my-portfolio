#!/bin/bash

# Portfolio Startup Script
echo "🚀 Starting Portfolio Development Servers..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start backend server
echo "📡 Starting backend server..."
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Servers started!"
echo "📡 Backend: http://localhost:5000"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

