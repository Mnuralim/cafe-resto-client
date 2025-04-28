"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { NotificationList } from "./notification";

interface Props {
  token: string;
}

const Navbar = ({ token }: Props) => {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <div className="p-4 bg-white shadow-md relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <FaBars className="text-2xl text-gray-800" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 hidden lg:block">
            Hello, Aldi
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
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
