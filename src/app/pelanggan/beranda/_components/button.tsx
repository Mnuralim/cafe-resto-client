import React from "react";

// Definisikan tipe props untuk Button
interface ButtonProps {
  onClick?: () => void; // Prop onClick opsional
}

function Button({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick} // Gunakan prop onClick
      className="bg-white text-[#3533A1] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition duration-300"
    >
      Mulai Pesan
    </button>
  );
}

export default Button;
