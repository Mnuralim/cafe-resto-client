"use client";
import React, { useRef, useState } from "react";
import {
  FaChartLine,
  FaChair,
  FaClipboardList,
  FaUser,
  FaTimes,
  FaUtensils,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    icon: <FaChartLine />,
    path: "/admin",
  },
  {
    title: "Meja",
    icon: <FaChair />,
    path: "/admin/table",
  },
  {
    title: "Menu",
    icon: <FaUtensils />,
    path: "/admin/menu",
  },
  {
    title: "Pesanan",
    icon: <FaClipboardList />,
    path: "/admin/orders",
  },
  {
    title: "Akun",
    icon: <FaUser />,
    path: "/admin/account",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (pathname === "/admin/login") return null;

  return (
    <>
      <div className="block lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-[#3533A1] text-white hover:bg-[#6A67CE] transition-all duration-300"
        >
          {isOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#3533A1] text-white shadow-lg transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Coffee & Resto</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-[#6A67CE] transition-all duration-300"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                    pathname === item.path
                      ? "bg-[#6A67CE] font-bold"
                      : "hover:bg-[#6A67CE]"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
