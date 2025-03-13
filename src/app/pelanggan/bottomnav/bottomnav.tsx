"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaUtensils,
  FaBoxOpen,
  FaShoppingCart,
  FaHistory,
} from "react-icons/fa"; // Ikon modern dari react-icons

function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path saat ini

  // Fungsi untuk menangani klik ikon
  const handleIconClick = (path: string) => {
    router.push(path); // Navigasi ke halaman yang sesuai
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around items-center p-2">
        {/* Icon Menu */}
        <button
          onClick={() => handleIconClick("/pelanggan/menu")}
          className="flex flex-col items-center"
        >
          <span
            className={`text-2xl ${
              pathname === "/pelanggan/menu"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            <FaUtensils className="w-6 h-6" />
          </span>
          <span
            className={`text-sm ${
              pathname === "/pelanggan/menu"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            Menu
          </span>
        </button>

        {/* Icon Status Pesanan */}

        {/* Icon Keranjang */}
        <button
          onClick={() => handleIconClick("/pelanggan/menu/addcart")}
          className="flex flex-col items-center"
        >
          <span
            className={`text-2xl ${
              pathname === "/pelanggan/menu/addcart"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            <FaShoppingCart className="w-6 h-6" />
          </span>
          <span
            className={`text-sm ${
              pathname === "/pelanggan/menu/addcart"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            Keranjang
          </span>
        </button>

        <button
          onClick={() => handleIconClick("/pelanggan/menu/orderstatus")}
          className="flex flex-col items-center"
        >
          <span
            className={`text-2xl ${
              pathname === "/pelanggan/menu/orderstatus"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            <FaBoxOpen className="w-6 h-6" />
          </span>
          <span
            className={`text-sm ${
              pathname === "/pelanggan/menu/orderstatus"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            Status
          </span>
        </button>

        {/* Icon Riwayat */}
        <button
          onClick={() => handleIconClick("/pelanggan/menu/riwayat")}
          className="flex flex-col items-center"
        >
          <span
            className={`text-2xl ${
              pathname === "/pelanggan/menu/riwayat"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            <FaHistory className="w-6 h-6" />
          </span>
          <span
            className={`text-sm ${
              pathname === "/pelanggan/menu/riwayat"
                ? "text-[#3533A1]"
                : "text-gray-700"
            }`}
          >
            Riwayat
          </span>
        </button>
      </div>
    </div>
  );
}

export default BottomNavigation;
