"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { FaHistory, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { PreserveLink } from "./preserver-link";
import { useCartStore } from "@/store/cart";

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
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems();

  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-50 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around max-w-3xl mx-auto  items-center p-2">
        {navItems.map((item) => (
          <PreserveLink
            key={item.title}
            href={`${item.path}`}
            className="flex flex-col items-center relative"
          >
            <div className="relative">
              <span
                className={`text-2xl ${
                  pathname === `${item.path}`
                    ? "text-[#3533A1]"
                    : "text-gray-700"
                }`}
              >
                {item.icon}
              </span>
              {item.title === "Keranjang" && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span
              className={`text-sm ${
                pathname === `${item.path}` ? "text-[#3533A1]" : "text-gray-700"
              }`}
            >
              {item.title}
            </span>
          </PreserveLink>
        ))}
      </div>
    </div>
  );
};
