"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaCheck, FaEdit, FaPrint } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { updateOrderStatus } from "@/lib/api";
import Swal from "sweetalert2";
import { Modal } from "@/app/admin/_components/modal";
import { customRevaldation } from "@/action";

interface Props {
  order: IOrder;
}

const orderStatus = [
  {
    status: "PENDING",
    label: "Pesanan Diterima",
  },
  {
    status: "PROCESSING",
    label: "Sedang Diproses",
  },
  {
    status: "COMPLETED",
    label: "Pesanan Selesai",
  },
  {
    status: "CANCELLED",
    label: "Pesanan Dibatalkan",
  },
];

export const DetailOrder = ({ order }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );
  const handleStatusChange = async () => {
    try {
      const response = await updateOrderStatus(order.id, selectedStatus);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }

      Swal.fire({
        title: "Berhasil!",
        text: resJson.message,
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });
      customRevaldation(`/admin/orders/${order.id}`, "page");
      setIsEditModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
        icon: "error",
        confirmButtonColor: "#6A67CE",
      });
    }
  };

  return (
    <div className="flex-1">
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/admin/orders"
              className="mr-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              <FaArrowLeft className="text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-[#3533A1]">
              Detail Pesanan #{order.id.substring(0, 8)}
            </h1>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-[#3533A1] text-white px-4 py-2 rounded-lg hover:bg-[#6A67CE] flex items-center"
            >
              <FaEdit className="mr-2" />
              Edit Status
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center">
              <FaPrint className="mr-2" />
              Cetak
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-[#3533A1] mb-4">
              Informasi Pesanan
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Pesanan</span>
                <span className="font-medium">{order.id.substring(0, 8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nama Pemesan</span>
                <span className="font-medium">{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meja</span>
                <span className="font-medium">Meja {order.table.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal</span>
                <span className="font-medium">
                  {formatDate(order.created_at)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Catatan</span>
                <span className="font-medium">{order.note || "-"}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-[#3533A1] mb-4">
              Status Pesanan
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
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
              </div>
              <div className="pt-4">
                <h3 className="text-gray-600 mb-2">Status Progres</h3>
                <div className="space-y-2">
                  {orderStatus.map((status) => (
                    <div
                      key={status.status}
                      className={`flex items-center ${
                        order.status === status.status ? "text-[#3533A1]" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          order.status === status.status
                            ? "bg-[#3533A1]"
                            : "bg-gray-300"
                        }`}
                      >
                        {order.status === status.status && (
                          <FaCheck className="text-white text-xs" />
                        )}
                      </div>
                      <span className="ml-2 text-sm">{status.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-[#3533A1] mb-4">
              Ringkasan Pembayaran
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(order.total_price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pajak (0%)</span>
                <span className="font-medium">
                  {formatCurrency(order.total_price * 0)}
                </span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">Total</span>
                <span className="text-[#3533A1]">
                  {formatCurrency(order.total_price * 1)}
                </span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span>Tunai</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-[#3533A1] text-white">
            <h2 className="text-lg font-semibold">Detail Item Pesanan</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Catatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.orderItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-14 w-14 relative rounded-md overflow-hidden">
                            <Image
                              width={400}
                              height={400}
                              src={item.menu.image}
                              alt={item.menu.name}
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.menu.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatCurrency(item.menu.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.note || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                    >
                      Subtotal
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(order.total_price)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                    >
                      Pajak (0%)
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(order.total_price * 0)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-sm font-bold text-gray-900 text-right"
                    >
                      Total
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#3533A1]">
                      {formatCurrency(order.total_price * 1)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#3533A1] mb-4">
            Edit Status Pesanan
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {orderStatus.map((status) => (
                <option key={status.status} value={status.status}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleStatusChange}
            className="bg-[#3533A1] text-white px-4 py-2 rounded-lg hover:bg-[#6A67CE]"
          >
            Simpan Perubahan
          </button>
        </div>
      </Modal>
    </div>
  );
};
