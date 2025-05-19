"use client";
import React from "react";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FilterControll } from "./filter-controll";
import { Pagination } from "../../_components/pagination";

interface Props {
  data: OrderApiResponse;
  currentSortOrder?: string;
  currentLimit?: string;
}

export const ListOrder = ({ data, currentLimit, currentSortOrder }: Props) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Selesai";
      case "PENDING":
        return "Diterima";
      case "PROCESSING":
        return "Diproses";
      case "CANCELLED":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const renderOrderCard = (order: IOrder) => (
    <div key={order.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-sm text-gray-600">
          ID: {order.id}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
            order.status
          )}`}
        >
          {getStatusLabel(order.status)}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-2">{order.customer_name}</h3>

      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Meja</p>
          <p className="font-medium">Meja {order.table.number}</p>
        </div>
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-medium">{formatCurrency(order.total_price)}</p>
        </div>
        <div>
          <p className="text-gray-500">Waktu</p>
          <p className="font-medium">{formatDate(order.created_at)}</p>
        </div>
        <div>
          <p className="text-gray-500">Jumlah Item</p>
          <p className="font-medium">{order.orderItems.length} item</p>
        </div>
      </div>

      <Link
        href={`/admin/orders/${order.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center w-full"
      >
        <FaEye className="mr-2" />
        Lihat Detail
      </Link>
    </div>
  );

  return (
    <div className="flex-1 w-full">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#3533A1]">
            Data Orders
          </h1>
        </div>

        <FilterControll currentSortOrder={currentSortOrder} />

        <div className="md:hidden space-y-4">
          {data.data.map(renderOrderCard)}
        </div>

        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left">ID Pesanan</th>
                  <th className="px-4 md:px-6 py-3 text-left">Nama Pemesan</th>
                  <th className="px-4 md:px-6 py-3 text-left">Meja</th>
                  <th className="px-4 md:px-6 py-3 text-left">Total Harga</th>
                  <th className="px-4 md:px-6 py-3 text-left">
                    Status Pesanan
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left">Waktu</th>
                  <th className="px-4 md:px-6 py-3 text-left">
                    Jumlah Pesanan
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-sm">{order.id}</td>
                    <td className="px-4 md:px-6 py-4">{order.customer_name}</td>
                    <td className="px-4 md:px-6 py-4">
                      Meja {order.table.number}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {formatCurrency(order.total_price)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {order.orderItems.length}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center text-sm whitespace-nowrap"
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

        <Pagination meta={data.meta} currentLimit={currentLimit} />

        {data.data.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              Belum ada pesanan yang masuk
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
