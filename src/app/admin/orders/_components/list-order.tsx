"use client";
import React from "react";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Props {
  data: IOrder[];
}

export const ListOrder = ({ data }: Props) => {
  return (
    <>
      <div className="flex-1">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3533A1]">Data Orders</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">ID Pesanan</th>
                  <th className="px-6 py-3 text-left">Nama Pemesan</th>
                  <th className="px-6 py-3 text-left">Meja</th>
                  <th className="px-6 py-3 text-left">Total Harga</th>
                  {/* <th className="px-6 py-3 text-left">Status Pembayaran</th> */}
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
                    <td className="px-6 py-4">
                      {formatCurrency(order.total_price)}
                    </td>
                    {/* <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.payment_status
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.payment_status ? "PAID" : "UNPAID"}
                      </span>
                    </td> */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status === "COMPLETED"
                          ? "Selesai"
                          : order.status === "PROCESSING"
                          ? "Diproses"
                          : order.status === "CANCELLED"
                          ? "Dibatalkan"
                          : "Diterima"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4">{order.orderItems.length}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center"
                      >
                        <FaEye className="mr-1" />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
