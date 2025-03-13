"use client";

import React from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa"; // Ikon modern dari react-icons
import { useRouter } from "next/navigation"; // Untuk navigasi
import BottomNavigation from "../../bottomnav/bottomnav"; // Sesuaikan path

export default function Riwayat() {
  const router = useRouter(); // Hook untuk navigasi

  // Fungsi untuk kembali ke halaman menu
  const handleBack = () => {
    router.push("/pelanggan/menu");
  };

  // Data riwayat pesanan (contoh)
  const riwayatPesanan = [
    {
      id: 1,
      tanggal: "2023-10-01",
      status: "Selesai",
      items: [
        { nama: "Cheeze Pizza", jumlah: 2, harga: 40000 },
        { nama: "Spaghetti", jumlah: 1, harga: 25000 },
      ],
      total: 65000,
    },
    {
      id: 2,
      tanggal: "2023-09-28",
      status: "Selesai",
      items: [
        { nama: "Burger", jumlah: 3, harga: 60000 },
        { nama: "French Fries", jumlah: 2, harga: 30000 },
      ],
      total: 90000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header dengan Tombol Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-700 hover:text-[#3533A1] transition duration-300"
          >
            <FaArrowLeft className="w-6 h-6" /> {/* Ikon panah kembali */}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Pesanan</h1>
          <div className="w-6 h-6"></div> {/* Spacer untuk menjaga alignment */}
        </div>

        {/* Daftar Riwayat Pesanan */}
        <div className="space-y-4">
          {riwayatPesanan.map((pesanan) => (
            <div
              key={pesanan.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Tanggal dan Status */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">{pesanan.tanggal}</span>
                <span className="flex items-center text-sm text-green-600">
                  <FaCheckCircle className="mr-1" /> {pesanan.status}
                </span>
              </div>

              {/* Daftar Item Pesanan */}
              <div className="space-y-2">
                {pesanan.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-800">
                      {item.nama} (x{item.jumlah})
                    </span>
                    <span className="text-gray-800">
                      Rp {item.harga.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Harga */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-[#3533A1]">
                    Rp {pesanan.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
