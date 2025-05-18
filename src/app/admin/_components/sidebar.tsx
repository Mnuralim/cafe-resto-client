"use client";
import React, { useRef, useState } from "react";
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
} from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    icon: <FaChartLine className="text-lg" />,
    path: "/admin",
  },
  {
    title: "Meja",
    icon: <FaChair className="text-lg" />,
    path: "/admin/table",
  },
  {
    title: "Menu",
    icon: <FaUtensils className="text-lg" />,
    path: "/admin/menu",
  },
  {
    title: "Pesanan",
    icon: <FaClipboardList className="text-lg" />,
    path: "/admin/orders",
  },
  {
    title: "Laporan",
    icon: <FaFileAlt className="text-lg" />,
    path: "/admin/report",
  },
  {
    title: "Logout",
    icon: <FaSignOutAlt className="text-lg" />,
    path: "#",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogoutClick = (e: React.MouseEvent, path: string) => {
    if (path === "#") {
      e.preventDefault();
      setShowLogoutModal(true);
    }
  };

  const handleLogout = () => {
    // Add your actual logout logic here
    console.log("Logging out...");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="block lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-xl bg-indigo-800 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-2xl transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="p-6 flex justify-between items-center  border-b border-[#3533A1]">
          <h1 className="text-2xl font-bold">Coffee & Resto</h1>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.title === "Logout" ? (
                  <button
                    onClick={(e) => handleLogoutClick(e, item.path)}
                    className="w-full flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-[#6A67CE] hover:shadow-lg group"
                  >
                    <span className="text-red-300 group-hover:text-red-350">
                      {item.icon}
                    </span>
                    <span className="ml-4 text-red-300 group-hover:text-red-350 font-medium">
                      {item.title}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                      pathname === item.path
                        ? "bg-[#6A67CE] font-medium shadow-md"
                        : "hover:bg-[#6A67CE] hover:shadow-md"
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <span
                      className={
                        pathname === item.path ? "text-cyan-300" : "text-white"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="ml-4">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700">
          <div className="text-center text-indigo-300 text-sm">
            Coffee & Resto © {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Add these styles to your global CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
