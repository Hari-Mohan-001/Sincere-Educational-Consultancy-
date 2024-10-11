import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketUrL } from "../Constants/Constants";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");


  useEffect(() => {
    const newSocket = io(SocketUrL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      secure: true,
      timeout: 10000, // Increase timeout to 10 seconds
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server' ,connectionStatus);
      setConnectionStatus("Connected");
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setConnectionStatus(`Error: ${error.message}`);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      setConnectionStatus(`Disconnected: ${reason}`);
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Attempting to reconnect: ${attemptNumber}`);
      setConnectionStatus(`Reconnecting: Attempt ${attemptNumber}`);
    });

    newSocket.io.on("error", (error) => {
      console.error('Socket.IO error:', error);
      setConnectionStatus(`IO Error: ${error.message}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
