import React from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative z-50 animate-fade-in">
        {children}
      </div>
    </div>
  );
};
