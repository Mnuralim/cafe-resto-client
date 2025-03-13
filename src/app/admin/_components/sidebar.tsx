"use client";
import React, { useRef, useEffect } from "react";
import {
  FaChartLine,
  FaUtensils,
  FaChair,
  FaClipboardList,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";
import Link from "next/link";

interface SidebarProps {
  isSidebarOpen: boolean;
  activeMenu: string;
  handleMenuClick: (menu: string) => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  activeMenu,
  handleMenuClick,
  closeSidebar,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menutup sidebar ketika klik di luar sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    // Tambahkan event listener ketika sidebar terbuka
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Bersihkan event listener ketika komponen di-unmount atau sidebar tertutup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 w-64 bg-[#3533A1] text-white shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-64`}
    >
      {/* Header Sidebar dengan Tombol Close (X) */}
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coffee & Resto</h1>
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[#6A67CE] transition-all duration-300"
        >
          <FaTimes className="text-2xl" />
        </button>
      </div>

      {/* Navigasi Sidebar */}
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              onClick={() => handleMenuClick("dashboard")}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                activeMenu === "dashboard"
                  ? "bg-[#6A67CE] font-bold"
                  : "hover:bg-[#6A67CE]"
              }`}
            >
              <FaChartLine className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <DropdownMenu
              title="Menu"
              icon={<FaUtensils className="mr-3" />}
              isActive={activeMenu === "menu"}
              onClick={() => handleMenuClick("menu")}
            >
              <Link
                href="/admin/menu/daftar_menu"
                onClick={() => handleMenuClick("data_menu")}
                className={`block p-2 pl-10 rounded-lg transition-all duration-300 ${
                  activeMenu === "data_menu"
                    ? "bg-[#6A67CE] font-bold"
                    : "hover:bg-[#6A67CE]"
                }`}
              >
                Daftar Menu
              </Link>
              <Link
                href="/admin/menu/kategori"
                onClick={() => handleMenuClick("kategori")}
                className={`block p-2 pl-10 rounded-lg transition-all duration-300 ${
                  activeMenu === "kategori"
                    ? "bg-[#6A67CE] font-bold"
                    : "hover:bg-[#6A67CE]"
                }`}
              >
                Kategori
              </Link>
            </DropdownMenu>
          </li>
          <li>
            <Link
              href="/admin/meja"
              onClick={() => handleMenuClick("meja")}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                activeMenu === "meja"
                  ? "bg-[#6A67CE] font-bold"
                  : "hover:bg-[#6A67CE]"
              }`}
            >
              <FaChair className="mr-3" />
              Meja
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              onClick={() => handleMenuClick("orders")}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                activeMenu === "orders"
                  ? "bg-[#6A67CE] font-bold"
                  : "hover:bg-[#6A67CE]"
              }`}
            >
              <FaClipboardList className="mr-3" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/admin/account"
              onClick={() => handleMenuClick("account")}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                activeMenu === "account"
                  ? "bg-[#6A67CE] font-bold"
                  : "hover:bg-[#6A67CE]"
              }`}
            >
              <FaUser className="mr-3" />
              Akun
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
