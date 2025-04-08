"use client"; // Wajib ditambahkan karena kita menggunakan useState
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function KeranjangPage() {
  // State untuk jumlah pesanan
  const [quantity, setQuantity] = useState(2);

  // State untuk menampilkan atau menghapus pesanan
  const [pesanan, setPesanan] = useState([
    {
      id: 1,
      nama: "Cheeze Pizza",
      harga: 20000,
      gambar: "/assets/menu/pizza.png", // Ganti dengan path gambar Anda
    },
  ]);

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

  // Fungsi untuk menghapus pesanan
  const handleHapusPesanan = (id: number) => {
    setPesanan(pesanan.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Container utama tanpa margin dan padding yang berlebihan */}
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header Keranjang dengan Icon Back */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Link href="/pelanggan/menu">
            <button className="mr-4 p-2 rounded-full hover:bg-gray-100 transition duration-300">
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
          <h1 className="text-2xl font-bold text-gray-800">Keranjang</h1>
        </div>

        {/* Informasi QR, Nama Pemesan, Meja, dan Orang */}
        <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-600">No QR</p>
            <p className="text-sm font-bold text-gray-800">0123</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Nama Pemesan</p>
            <p className="text-sm font-bold text-gray-800">Aldi</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Meja</p>
            <p className="text-sm font-bold text-gray-800">4</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Orang</p>
            <p className="text-sm font-bold text-gray-800">3</p>
          </div>
        </div>

        {/* Daftar Pesanan */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pesanan Anda</h2>
          {pesanan.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-4 rounded-lg relative mb-4"
            >
              {/* Icon X (Hapus) */}
              <button
                onClick={() => handleHapusPesanan(item.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Gambar dan Deskripsi Pesanan */}
              <div className="flex items-center">
                <div className="w-16 h-16 relative mr-4">
                  <Image
                    src={item.gambar}
                    alt={item.nama}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-800">{item.nama}</p>
                  <p className="text-lg font-bold text-gray-800">
                    Rp {item.harga.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Subtotal dan Tombol +/- Secara Horizontal */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Subtotal:{" "}
                  <span className="font-bold text-gray-800">
                    Rp {(quantity * item.harga).toLocaleString()}
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDecrease}
                    className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-gray-800">
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
            </div>
          ))}
        </div>

        {/* Pesan Lagi dan Button Tambah */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mau pesan lainnya? Anda masih bisa pesan lagi.
          </p>
          <Link href="/pelanggan/menu">
            <button className="bg-[#3533A1] text-white px-4 py-2 rounded-lg hover:bg-[#3533a1f5] transition duration-300">
              Tambah
            </button>
          </Link>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <p className="text-xl font-bold text-gray-800">Total</p>
          <p className="text-xl font-bold text-gray-800">
            Rp {(quantity * 20000).toLocaleString()}
          </p>
        </div>
        {/* Tombol Lanjutkan */}
        <div className="p-4">
          <Link href="/pelanggan/menu/orderstatus">
            <button className="w-full bg-[#3533A1] text-white py-3 rounded-lg font-bold hover:bg-[#3533a1f5] transition duration-300">
              Pesan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
