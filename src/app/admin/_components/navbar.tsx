"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { NotificationList } from "./notification";

interface Props {
  token: string;
}

const Navbar = ({ token }: Props) => {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <div className="p-4 bg-white shadow-md relative z-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Hello, Aldi
          </h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-32 md:w-auto border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <NotificationList token={token} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
