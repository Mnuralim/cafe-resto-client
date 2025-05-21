"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHistory, FaShoppingCart, FaUtensils } from "react-icons/fa";

const navItems = [
  {
    title: "Menu",
    icon: <FaUtensils />,
    path: "/menu",
  },
  {
    title: "Keranjang",
    icon: <FaShoppingCart />,
    path: "/cart",
  },

  {
    title: "Riwayat",
    icon: <FaHistory />,
    path: "/history",
  },
];

export const BottomNav = () => {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-50 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around max-w-3xl mx-auto  items-center p-2">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={`${item.path}`}
            className="flex flex-col items-center"
          >
            <span
              className={`text-2xl ${
                pathname === `${item.path}` ? "text-[#3533A1]" : "text-gray-700"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-sm ${
                pathname === `${item.path}` ? "text-[#3533A1]" : "text-gray-700"
              }`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
