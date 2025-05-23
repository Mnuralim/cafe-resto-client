"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  FaChartLine,
  FaChair,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes,
  FaUtensils,
  FaBars,
  FaFileAlt,
  FaExclamationTriangle,
  FaUser,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/api";

const navItems = [
  {
    title: "Dashboard",
    icon: <FaChartLine className="w-5 h-5" />,
    path: "/admin",
  },
  {
    title: "Meja",
    icon: <FaChair className="w-5 h-5" />,
    path: "/admin/table",
  },
  {
    title: "Menu",
    icon: <FaUtensils className="w-5 h-5" />,
    path: "/admin/menu",
  },
  {
    title: "Pesanan",
    icon: <FaClipboardList className="w-5 h-5" />,
    path: "/admin/orders",
  },
  {
    title: "Laporan",
    icon: <FaFileAlt className="w-5 h-5" />,
    path: "/admin/report",
  },
  {
    title: "Pengaturan",
    icon: <FaCog className="w-5 h-5" />,
    path: "/admin/settings",
  },
];

const Sidebar = ({ username = "Admin" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024 &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMounted]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  if (pathname === "/admin/login") return null;
  if (!isMounted) return null;
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-3.5 left-4 p-2 rounded-md bg-indigo-800 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] active:translate-y-2 active:translate-x-2 active:shadow-none transition-all z-30 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed left-0 top-0 h-full z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 ease-in-out
          w-72 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white
          shadow-lg
          ${pathname === "/admin/login" ? "hidden" : ""}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-[#3533A1]">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white">Coffee & Resto</h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-indigo-700 lg:hidden"
              aria-label="Close sidebar"
            >
              <FaTimes className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1 pt-5 pb-4 overflow-y-auto">
            <nav className="px-3">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <li key={index}>
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all 
                          ${
                            isActive
                              ? "bg-[#6A67CE] text-cyan-300 font-medium shadow-md"
                              : "text-white hover:bg-[#6A67CE] hover:shadow-md"
                          }`}
                        onClick={closeSidebarOnMobile}
                      >
                        <span
                          className={`flex-shrink-0 ${
                            isActive ? "text-cyan-300" : "text-white"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="ml-3 font-medium">{item.title}</span>
                        {isActive && (
                          <span className="ml-auto w-1 h-6 bg-cyan-300" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="p-4 mt-auto border-t border-indigo-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                {username ? (
                  username.charAt(0).toUpperCase()
                ) : (
                  <FaUser className="w-5 h-5" />
                )}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">
                  {username}
                </p>
              </div>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="p-2 cursor-pointer bg-red-700 hover:bg-red-600 rounded-md text-white"
                title="Logout"
              >
                <FaSignOutAlt className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center text-indigo-300 text-sm p-2 border-t border-indigo-700">
            Coffee & Resto © {new Date().getFullYear()}
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all duration-300 scale-95 animate-fadeIn">
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <FaExclamationTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Konfirmasi Logout
              </h3>
              <p className="text-gray-600 mb-8">
                Anda akan keluar dari akun admin. Yakin ingin melanjutkan?
              </p>
              <div className="flex justify-center gap-5">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Ya, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
