"use client";
import { getAllNotifications, readNotification } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { io, Socket } from "socket.io-client";

interface Props {
  token: string;
}

export const NotificationList = ({ token }: Props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const notificationData = await getAllNotifications(token);
      const unreadNotifications =
        notificationData?.filter((notif: INotification) => !notif.read) || [];
      setNotifications(notificationData);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        return permission;
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        return null;
      }
    }
    return null;
  };

  const showBrowserNotification = (title: string, body: string) => {
    if (notificationPermission !== "granted") {
      return;
    }

    try {
      const notification = new Notification(title, {
        body: body,
        icon: "/next.svg",
        badge: "/next.svg",
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        setShowNotifications(true);
      };

      setTimeout(() => {
        notification.close();
      }, 5000);
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      setSocketConnected(true);
      socket.emit("join-admin-room");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setSocketConnected(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setSocketConnected(false);
    });

    socket.on("new-order", (notification) => {
      console.log("New order notification received:", notification);
      setNotifications((prev) => [notification.data, ...prev]);
      setUnreadCount((prev) => prev + 1);
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play notification sound:", err);
        });
      }

      if (notificationPermission === "granted") {
        showBrowserNotification("Pesanan Baru", notification.data.message);
      } else if (notificationPermission !== "denied") {
        requestNotificationPermission().then((permission) => {
          if (permission === "granted") {
            showBrowserNotification("Pesanan Baru", notification.data.message);
          }
        });
      }
    });

    // SOON
    // socket.on("payment-received", (notification) => {
    //   console.log("Payment received notification received:", notification);
    //   setNotifications((prev) => [notification, ...prev]);
    //   setUnreadCount((prev) => prev + 1);
    //   if (audioRef.current) {
    //     audioRef.current.play().catch((err) => {
    //       console.error("Failed to play notification sound:", err);
    //     });
    //   }

    //   if (notificationPermission === "granted") {
    //     showBrowserNotification("Pembayaran Diterima", notification.message);
    //   }
    // });

    return () => {
      if (socketRef.current) {
        if (socketRef.current.connected) {
          socketRef.current.emit("leave-admin-room");
        }
        socketRef.current.disconnect();
        console.log("Socket disconnected during cleanup");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL, notificationPermission]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = async (notifId: string) => {
    const currentNotif = notifications.find((notif) => notif.id === notifId);
    if (currentNotif?.read) {
      router.push(`/admin/orders/${currentNotif.order_id}`);
      return;
    }
    try {
      const response = await readNotification(notifId);
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      const resJson = await response.json();
      const data: INotification = resJson.data;

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notifId ? { ...notif, read: true } : notif
        )
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
      router.push(`/admin/orders/${data.order_id}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // const handleMarkAllAsRead = async () => {
  //   try {
  //     const response = await fetch(
  //       `${API_URL}/api/v1/notifications/mark-all-read`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to mark all notifications as read");
  //     }

  //     setNotifications((prev) =>
  //       prev.map((notif) => ({ ...notif, read: true }))
  //     );
  //     setUnreadCount(0);
  //   } catch (error) {
  //     console.error("Failed to mark all notifications as read:", error);
  //   }
  // };

  const handleViewAll = () => {
    console.log("View all notifications");
    fetchNotifications();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        className="p-2 rounded-lg hover:bg-gray-100 relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell
          className={`text-2xl ${
            socketConnected ? "text-gray-800" : "text-gray-400"
          }`}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {notificationPermission !== "granted" && (
        <button
          onClick={requestNotificationPermission}
          className="absolute -top-10 -right-2 bg-blue-500 text-white text-xs rounded px-2 py-1 shadow-md"
        >
          Aktifkan Notifikasi
        </button>
      )}

      <audio
        ref={audioRef}
        src="/sounds/notification-alert-4-331722.mp3"
        preload="auto"
      />

      <div
        className={`absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 origin-top-right z-50 ${
          showNotifications
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 font-semibold border-b flex justify-between items-center">
          <span>Notifikasi</span>
          <div className="flex gap-2">
            {!socketConnected && (
              <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                Offline
              </span>
            )}
            {socketConnected && unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {unreadCount} baru
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Memuat notifikasi...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Tidak ada notifikasi
          </div>
        ) : (
          <>
            <ul className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`px-4 py-3 hover:bg-gray-100 text-sm border-b last:border-0 cursor-pointer ${
                    !notif.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notif.id)}
                >
                  <div className="font-medium">{notif.message}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(notif.created_at)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex border-t">
              <div
                className="text-center py-3 text-sm text-blue-600 hover:underline cursor-pointer flex-1 border-r"
                onClick={handleViewAll}
              >
                Lihat semua
              </div>
              {unreadCount > 0 && <div></div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
