"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash, FaHome } from "react-icons/fa";
import Link from "next/link";

interface Props {
  data: IOrder[];
}

export const ListOrder = ({ data }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="flex-1">
        <div className="p-6">
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#3533A1]"
                >
                  <FaHome className="mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <Link
                    href="/admin/orders"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3533A1] md:ml-2"
                  >
                    Orders
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="ml-1 text-sm font-medium text-[#3533A1] md:ml-2">
                    Data Orders
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3533A1]">Data Orders</h1>
          </div>

          {/* Tabel Data Orders */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">ID Pesanan</th>
                  <th className="px-6 py-3 text-left">Nama Pemesan</th>
                  <th className="px-6 py-3 text-left">Meja</th>
                  <th className="px-6 py-3 text-left">Total Harga</th>
                  <th className="px-6 py-3 text-left">Status Pembayaran</th>
                  <th className="px-6 py-3 text-left">Status Pesanan</th>
                  <th className="px-6 py-3 text-left">Waktu</th>
                  <th className="px-6 py-3 text-left">Jumlah Pesanan</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.customer_name}</td>
                    <td className="px-6 py-4">Meja {order.table.number}</td>
                    <td className="px-6 py-4">{order.total_price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.payment_status
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.payment_status ? "PAID" : "UNPAID"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.created_at}</td>
                    <td className="px-6 py-4">{order.orderItems.length}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center">
                        <FaEdit className="mr-1" />
                        Status
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center">
                        <FaTrash className="mr-1" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Edit Order
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Pemesan</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jumlah Pemesan</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Meja</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Menu</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jumlah Pesanan</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Harga</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi Pesanan</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Hapus Order
            </h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus order ini?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
