"use client";
import React, { useRef } from "react";
import {
  FaChartLine,
  FaChair,
  FaClipboardList,
  FaUser,
  FaTimes,
  FaUtensils,
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

const Sidebar = ({}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fungsi untuk menutup sidebar ketika klik di luar sidebar
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       closeSidebar();
  //     }
  //   };

  //   // Tambahkan event listener ketika sidebar terbuka
  //   if (isSidebarOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   // Bersihkan event listener ketika komponen di-unmount atau sidebar tertutup
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isSidebarOpen, closeSidebar]);

  if (pathname === "/admin/login") return null;

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 w-64 bg-[#3533A1] text-white shadow-lg transform transition-transform duration-300 
        translate-x-0 
      lg:translate-x-0 lg:static lg:w-64`}
    >
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coffee & Resto</h1>
        <button
          // onClick={closeSidebar}
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
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
