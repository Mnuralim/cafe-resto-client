"use client"; // Wajib ditambahkan karena kita menggunakan useRouter

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Impor useRouter untuk navigasi
import Button from "./_components/button";

export default function BerandaPage() {
  const router = useRouter(); // Inisialisasi useRouter

  // Fungsi untuk menangani klik tombol "Mulai Pesan"
  const handleMulaiPesan = () => {
    router.push("menu"); // Arahkan ke halaman menu
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-[#3533A1] rounded-lg shadow-lg p-8 max-w-md w-full text-center flex flex-col items-center justify-between h-[90vh]">
        {/* Bagian Gambar */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/assets/beranda/topping.png" // Path ke gambar
            alt="Topping"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
        </div>

        {/* Bagian Teks */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Hai, selamat datang
          </h1>
          <h2 className="text-2xl text-white mb-6">di Kafe Coffee & Resto</h2>
        </div>

        {/* Bagian Tombol */}
        <div className="flex-1 flex items-center justify-center">
          <Button onClick={handleMulaiPesan} />{" "}
        </div>
      </div>
    </div>
  );
}
