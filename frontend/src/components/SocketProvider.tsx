'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  visitorCount: number;
  onlineUsers: number;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  visitorCount: 0,
  onlineUsers: 0,
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);

  // Track visitor via HTTP as fallback (ensures no visitors are lost)
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const sessionId = sessionStorage.getItem('sessionId') || `session-${Date.now()}-${Math.random()}`;
        sessionStorage.setItem('sessionId', sessionId);

        await fetch(`${apiUrl}/api/visitor/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || '/',
            sessionId: sessionId,
          }),
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track on mount
    trackVisitor();
  }, []);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL || 'https://my-portfolio-72dq.onrender.com';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    newSocket.on('visitorCount', (count: number) => {
      setVisitorCount(count);
    });

    newSocket.on('onlineUsers', (count: number) => {
      setOnlineUsers(count);
    });

    newSocket.on('newVisitor', () => {
      // Optional: Show notification or animation
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, visitorCount, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

