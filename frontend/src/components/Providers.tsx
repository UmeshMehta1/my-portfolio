'use client';

import { ThemeProvider } from './ThemeProvider';
import { SocketProvider } from './SocketProvider';
import { ToastProvider } from './Toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SocketProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

