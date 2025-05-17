"use client";
import { usePathname } from "next/navigation";
import React from "react";
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
          <NotificationList token={token} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
