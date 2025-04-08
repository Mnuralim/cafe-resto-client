"use client"; // Wajib ditambahkan karena kita menggunakan useState

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Impor Link dari next/link

export default function DeskripsiMenu() {
  const [quantity, setQuantity] = useState(1); // State untuk jumlah pesanan
  const [namaPemesan, setNamaPemesan] = useState(""); // State untuk nama pemesan
  const [jumlahPemesan, setJumlahPemesan] = useState(1); // State untuk jumlah pemesan

  // Fungsi untuk menambah jumlah pesanan
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Fungsi untuk mengurangi jumlah pesanan
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Fungsi untuk menambah jumlah pemesan
  const handleIncreasePemesan = () => {
    setJumlahPemesan(jumlahPemesan + 1);
  };

  // Fungsi untuk mengurangi jumlah pemesan
  const handleDecreasePemesan = () => {
    if (jumlahPemesan > 1) {
      setJumlahPemesan(jumlahPemesan - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Gambar Menu */}
        <div className="relative h-48 w-full">
          <Image
            src="/assets/menu/pizza.png" // Ganti dengan path gambar Anda
            alt="Cheeze Pizza"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />

          {/* Tombol Back */}
          <Link href="/pelanggan/menu" className="absolute top-4 left-4">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Deskripsi Menu */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Cheeze Pizza
          </h1>
          <p className="text-gray-600 mb-4">
            Pizza lezat dengan lelehan keju ekstra, saus spesial rahasia, dan
            topping yang menggugah selera.
          </p>

          {/* Harga */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-bold text-gray-800">Rp 20.000</p>
          </div>

          {/* Form Nama Pemesan */}
          <div className="mb-6">
            <label
              htmlFor="namaPemesan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Pemesan (Mewakili)
            </label>
            <input
              type="text"
              id="namaPemesan"
              value={namaPemesan}
              onChange={(e) => setNamaPemesan(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Masukkan nama pemesan"
            />
          </div>

          {/* Jumlah Pemesan */}
          <div className="flex items-center justify-between mb-6">
            <label className="text-sm font-medium text-gray-700">
              Berapa Orang
            </label>
            <div className="flex items-center">
              <button
                onClick={handleDecreasePemesan}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
              >
                -
              </button>
              <span className="mx-4 text-lg font-bold text-gray-800">
                {jumlahPemesan}
              </span>
              <button
                onClick={handleIncreasePemesan}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Catatan Pesanan */}
          <div className="mb-6">
            <label
              htmlFor="catatan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tulis catatan pesanan Anda
            </label>
            <textarea
              id="catatan"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Contoh: Tidak pakai pedas, tambah keju, dll."
            ></textarea>
          </div>

          {/* Jumlah Pesanan */}
          <div className="flex items-center justify-between mb-6">
            <label className="text-sm font-medium text-gray-700">Jumlah</label>
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
              >
                -
              </button>
              <span className="mx-4 text-lg font-bold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <div className="w-full">
            <Link
              href="/pelanggan/menu/addcart"
              className="block w-full bg-[#3533A1] text-white py-3 rounded-lg font-bold hover:bg-[#3533a1f5] transition duration-300 text-center"
            >
              Tambah ke Keranjang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
