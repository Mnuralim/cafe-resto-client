import { create } from "zustand";
import { io, Socket } from "socket.io-client";

export interface SocketEventData {
  id: string;
  message: string;
  created_at: string;
  [key: string]: unknown;
}

export interface NewOrderNotification {
  data: INotification;
  [key: string]: unknown;
}

export interface SocketState {
  socket: Socket | null;
  connected: boolean;
  connect: (token?: string) => void;
  disconnect: () => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  connected: false,

  connect: (token?: string) => {
    // If socket already exists and is connected, do nothing
    if (get().socket?.connected) {
      console.log("Socket already connected");
      return;
    }

    console.log("Connecting to socket.io server at:", API_URL);

    const socket = io(API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      auth: token ? { token } : undefined,
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully with ID:", socket.id);
      set({ connected: true });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      set({ connected: false });
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      set({ connected: false });
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      console.log("Socket disconnected manually");
      set({ socket: null, connected: false });
    }
  },

  joinRoom: (room: string) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("join-room", room);
      console.log(`Joined room: ${room}`);
    } else {
      console.warn("Cannot join room: Socket not connected");
    }
  },

  leaveRoom: (room: string) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("leave-room", room);
      console.log(`Left room: ${room}`);
    }
  },
}));
