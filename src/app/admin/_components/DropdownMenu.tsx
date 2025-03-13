"use client";
import React, { useState } from "react";

interface DropdownMenuProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  icon,
  isActive,
  onClick,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <a
        href="#"
        onClick={() => {
          onClick();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
          isActive ? "bg-[#6A67CE] font-bold" : "hover:bg-[#6A67CE]"
        }`}
      >
        {icon}
        <span className="flex-1">{title}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
      {isOpen && (
        <div className="mt-2 pl-6 transition-all duration-300">{children}</div>
      )}
    </div>
  );
};

export default DropdownMenu;
