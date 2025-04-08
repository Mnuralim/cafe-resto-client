"use client"; // Wajib ditambahkan karena kita menggunakan useState
// components/OrderStatus.js

import { useState } from "react";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function OrderChecked() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    // Tambahkan logika lain jika diperlukan, seperti mengirim status ke backend
    console.log("Status pesanan diperiksa");
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        {/* Header dengan ikon back di sebelah kiri */}
        <div className="flex items-center mb-4">
          <Link href="/pelanggan/menu">
            <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
              <FaArrowLeft className="text-gray-700" />
            </button>
          </Link>
          <div className="font-bold text-xl ml-2">Status Pesanan</div>
        </div>

        {/* Ikon loading dan teks pesanan sedang diperiksa */}
        <div className="flex flex-col mt-8 items-center justify-center mb-4">
          <FaSpinner className="animate-spin text-4xl text-[#3533A1] mb-2" />
          <p className="text-gray-700 font-bold text-base">
            Pesanan anda sedang diperiksa
          </p>
        </div>
      </div>

      {/* Detail pesanan */}
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <span className="text-gray-700">Nomor QR:</span>
          <span className="ml-2 font-semibold">021345</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-gray-700">Pemesan:</span>
          <span className="ml-2 font-semibold">Aldi</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-gray-700">No Meja/Orang:</span>
          <span className="ml-2 font-semibold">4/3</span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-lg mb-2">Ringkasan Order</h3>
          <div className="flex justify-between items-center mb-2">
            <span>2x Cheeze Pizza</span>
            <span className="font-semibold">Rp40.000</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>2x Es Teh manis</span>
            <span className="font-semibold">Rp10.000</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="font-semibold">Total Pembayaran:</span>
            <span className="font-semibold">Rp50.000</span>
          </div>
        </div>
      </div>

      {/* Tombol Cek Status Pesanan */}
      <div className="px-6 py-4 bg-gray-50">
        <Link href={"#"}>
          <button
            onClick={handleCheck}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3533A1] hover:bg-blue-800 "
          >
            Cek Status Pesanan
          </button>
        </Link>
      </div>
    </div>
  );
}
