// lib/hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type EventHandler = (data: any) => void;

interface UseSocketOptions {
  room?: string;
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const { room, onConnect, onDisconnect } = options;

  useEffect(() => {
    console.log("Connecting to socket.io server at:", API_URL);

    const socket = io(API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected successfully with ID:", socket.id);
      setConnected(true);

      if (room) {
        socket.emit(`join-${room}-room`);
      }

      if (onConnect) {
        onConnect();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnected(false);

      if (onDisconnect) {
        onDisconnect(reason);
      }
    });

    return () => {
      if (socketRef.current) {
        if (socketRef.current.connected && room) {
          socketRef.current.emit(`leave-${room}-room`);
        }
        socketRef.current.disconnect();
        console.log("Socket disconnected during cleanup");
      }
    };
  }, [API_URL, room, onConnect, onDisconnect]);

  const on = (event: string, handler: EventHandler) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  };

  const off = (event: string, handler?: EventHandler) => {
    if (socketRef.current) {
      socketRef.current.off(event, handler);
    }
  };

  const emit = (event: string, data?: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data);
      return true;
    }
    return false;
  };

  return {
    socket: socketRef.current,
    connected,
    on,
    off,
    emit,
  };
};
