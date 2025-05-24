"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { PreserveLink } from "@/app/_components/preserver-link";

export const ListCart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Keranjang Belanja
          </h1>
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p className="text-gray-600 mb-6">Keranjang belanja kamu kosong</p>
            <PreserveLink
              href="/menu"
              className="px-6 py-2 bg-[#3533A1] text-white rounded-lg hover:bg-[#2a287e] transition-all"
            >
              Lihat Menu
            </PreserveLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Keranjang Belanja
            </h1>
            <button
              onClick={() => clearCart()}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Hapus Semua
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Kategori: {item.category.name}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center border rounded-lg overflow-hidden mb-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 bg-gray-100 text-black hover:bg-gray-200"
                      >
                        -
                      </button>

                      <span className="px-4 text-black py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-100 text-black hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <p className="text-gray-600">
                    Subtotal: Rp{" "}
                    {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Total ({items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                item)
              </span>
              <span className="font-bold text-gray-800">
                Rp {getTotalPrice().toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Biaya pengiriman</span>
              <span className="font-bold text-gray-800">Rp 0</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg text-black font-bold">
                  Total Pembayaran
                </span>
                <span className="text-lg font-bold text-[#3533A1]">
                  Rp {getTotalPrice().toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <PreserveLink
              href="/menu"
              className="w-full px-6 text-center py-3 border border-[#3533A1] text-[#3533A1] rounded-lg hover:bg-gray-50 transition-all"
            >
              Kembali ke Menu
            </PreserveLink>
            <PreserveLink
              href="/checkout"
              className="flex-1 px-6 py-3 bg-[#3533A1] text-center text-white rounded-lg hover:bg-[#2a287e] transition-all"
            >
              Checkout
            </PreserveLink>
          </div>
        </div>
      </div>
    </div>
  );
};
