'use client';

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
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
  const visitorTrackedRef = useRef(false);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL || 'https://my-portfolio-72dq.onrender.com';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    let httpFallbackTimeout: NodeJS.Timeout | null = null;

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
      
      // Clear HTTP fallback since socket connected
      if (httpFallbackTimeout) {
        clearTimeout(httpFallbackTimeout);
        httpFallbackTimeout = null;
      }
      
      // Send sessionId to server for deduplication
      const sessionId = sessionStorage.getItem('sessionId') || `session-${Date.now()}-${Math.random()}`;
      sessionStorage.setItem('sessionId', sessionId);
      newSocket.emit('visitor-info', {
        sessionId: sessionId,
        page: window.location.pathname,
        referrer: document.referrer || '/',
      });
      visitorTrackedRef.current = true;
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

    // Track visitor via HTTP only if socket doesn't connect within 3 seconds
    httpFallbackTimeout = setTimeout(async () => {
      if (!visitorTrackedRef.current && !newSocket.connected) {
        try {
          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL ||
            'https://my-portfolio-72dq.onrender.com';
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
          visitorTrackedRef.current = true;
        } catch (error) {
          console.error('Error tracking visitor:', error);
        }
      }
    }, 3000);

    return () => {
      if (httpFallbackTimeout) {
        clearTimeout(httpFallbackTimeout);
      }
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

