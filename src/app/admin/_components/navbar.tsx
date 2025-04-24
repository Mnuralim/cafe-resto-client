"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

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

  if (pathname === "/admin/login") return null;

  const notifications = [
    { id: 1, text: "Pesanan baru masuk 🍽️" },
    { id: 2, text: "Stok kopi hampir habis ☕" },
    { id: 3, text: "User baru mendaftar 👤" },
  ];

  return (
    <div className="p-4 bg-white shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Sidebar toggle + Greeting */}
        <div className="flex items-center space-x-4">
          <button
            // onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-2xl text-gray-800" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 hidden lg:block">
            Hello, Aldi
          </h1>
        </div>

        {/* Search + Notification */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Notification Icon */}
          <div className="relative" ref={notifRef}>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="text-2xl text-gray-800" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {notifications.length}
              </span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 origin-top-right ${
                showNotifications
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="p-4 font-semibold border-b">Notifikasi</div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {notif.text}
                  </li>
                ))}
              </ul>
              <div className="text-center py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                Lihat semua
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
