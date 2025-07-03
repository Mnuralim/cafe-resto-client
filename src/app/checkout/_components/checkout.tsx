"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useOrderHistoryStore } from "@/store/order-history";
import { PreserveLink } from "@/app/_components/preserver-link";
import Swal from "sweetalert2";

interface Props {
  tableNumberData: number;
  tableId: string;
}

export const Checkout = ({ tableNumberData, tableId }: Props) => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderHistoryStore();
  const [customerName, setCustomerName] = useState<string>("");
  const [generalNotes, setGeneralNotes] = useState<string>("");
  const [latitudeData, setLatitudeData] = useState<number | null>(null);
  const [longitudeData, setLongitudeData] = useState<number | null>(null);
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitudeData(latitude);
          setLongitudeData(longitude);
        },
        (error) => {
          console.error("Gagal ambil lokasi:", error);
        }
      );
    } else {
      console.error("Geolocation tidak didukung");
    }
  }, []);

  const handleItemNoteChange = (id: string, note: string) => {
    setItemNotes((prev) => ({
      ...prev,
      [id]: note,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      if (!customerName.trim()) {
        throw new Error("Nama pelanggan harus diisi");
      }

      if (!latitudeData || !longitudeData) {
        throw new Error(
          "Gagal mendapatkan lokasi. Izin lokasi ditolak. Silakan berikan izin lokasi dan coba lagi."
        );
      }

      if (!tableNumberData && tableNumberData !==0) {
        throw new Error("Nomor meja tidak valid");
      }
      const response = await createOrder(
        latitudeData,
        longitudeData,
        customerName,
        tableId,
        items.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
          note: itemNotes[item.id] || "",
        })),
        generalNotes
      );
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message || "Gagal membuat pesanan");
      }
      const data: IOrder = resJson.data;
      clearCart();
      addOrder(data);

      Swal.fire({
        title: "Berhasil!",
        text: "Pesanan berhasil dibuat",
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });
      router.push(`/history/${data.id}?table=${tableId}`);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
        icon: "error",
        confirmButtonColor: "#6A67CE",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Konfirmasi Pesanan
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="customerName"
                className="block text-gray-700 font-medium mb-2"
              >
                Nama Pemesan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tableNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Nomor Meja
              </label>
              <input
                type={tableNumberData === 0 ? "text" : "number"}
                id="tableNumber"
                value={
                  tableNumberData === 0 ? "Meja Take Away" : tableNumberData
                }
                readOnly
                disabled
                className="w-full p-3 border text-black border-gray-300 rounded-lg bg-gray-50 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Nomor meja diambil dari QR code yang Anda scan
              </p>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Detail Pesanan
              </h2>

              <div className="space-y-6 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="border-b pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-black">
                            {item.name}
                          </h3>
                          <span className="text-black">x{item.quantity}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Kategori: {item.category.name}
                        </p>
                        <p className="text-[#3533A1] font-bold">
                          Rp{" "}
                          {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>

                        <div className="mt-2">
                          <label
                            htmlFor={`note-${item.id}`}
                            className="block text-sm text-gray-600 mb-1"
                          >
                            Catatan untuk item ini:
                          </label>
                          <input
                            type="text"
                            id={`note-${item.id}`}
                            value={itemNotes[item.id] || ""}
                            onChange={(e) =>
                              handleItemNoteChange(item.id, e.target.value)
                            }
                            className="w-full p-2 text-sm border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3533A1]"
                            placeholder="Contoh: tidak pedas, tanpa es, dll."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="generalNotes"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Catatan Umum (Opsional)
                </label>
                <textarea
                  id="generalNotes"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
                  rows={2}
                  placeholder="Catatan tambahan untuk keseluruhan pesanan"
                />
              </div>
            </div>

            <div className="border-t pt-4">
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

              <p className="text-sm text-gray-500 mb-4">
                Pembayaran dilakukan secara tunai saat makanan diantar ke meja
                Anda
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              <PreserveLink href="/cart" className="flex-1">
                <button
                  type="button"
                  className="w-full px-6 py-3 border border-[#3533A1] text-[#3533A1] rounded-lg hover:bg-gray-50 transition-all"
                >
                  Kembali
                </button>
              </PreserveLink>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 bg-[#3533A1] text-white rounded-lg transition-all ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#2a287e]"
                }`}
              >
                {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
