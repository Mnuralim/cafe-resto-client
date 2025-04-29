"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPrint } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

interface Props {
  order: IOrder;
}

const orderStatusInfo = {
  PENDING: {
    label: "Pesanan Diterima",
    color: "bg-yellow-100 text-yellow-800",
    description: "Pesanan Anda telah diterima dan sedang menunggu proses.",
  },
  PROCESSING: {
    label: "Sedang Diproses",
    color: "bg-blue-100 text-blue-800",
    description: "Koki kami sedang menyiapkan pesanan Anda.",
  },
  COMPLETED: {
    label: "Pesanan Selesai",
    color: "bg-green-100 text-green-800",
    description: "Pesanan Anda telah selesai dan siap disajikan.",
  },
  CANCELLED: {
    label: "Pesanan Dibatalkan",
    color: "bg-red-100 text-red-800",
    description: "Pesanan Anda telah dibatalkan.",
  },
};

export const UserOrderDetail = ({ order }: Props) => {
  const [orderData, setOrderData] = useState<IOrder>(order);
  const socketRef = useRef<Socket | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const currentStatus = orderStatusInfo[orderData.status];

  useEffect(() => {
    const socket = io(API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socketRef.current = socket;

    socket.on("order-status-change", (data) => {
      const orderDataRealTime: IOrder = data.data;
      if (orderDataRealTime.id === orderData.id) {
        setOrderData((prevData) => ({
          ...prevData,
          status: orderDataRealTime.status,
        }));
      }
    });

    return () => {
      if (socketRef.current) {
        if (socketRef.current.connected) {
          socketRef.current.emit("leave-order-room", { orderId: order.id });
        }
        socketRef.current.disconnect();
        console.log("Socket disconnected during cleanup");
      }
    };
  }, [API_URL, order.id, orderData.id]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto pt-6 px-4">
        <div className="flex items-center mb-6">
          <Link
            href="/orders"
            className="mr-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <FaArrowLeft className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            Pesanan #{orderData.id.substring(0, 8)}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Status Pesanan
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${currentStatus.color}`}
            >
              {currentStatus.label}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{currentStatus.description}</p>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {orderData.status === "COMPLETED"
                    ? "100%"
                    : orderData.status === "PROCESSING"
                    ? "50%"
                    : orderData.status === "PENDING"
                    ? "25%"
                    : "0%"}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
              <div
                style={{
                  width:
                    orderData.status === "COMPLETED"
                      ? "100%"
                      : orderData.status === "PROCESSING"
                      ? "50%"
                      : orderData.status === "PENDING"
                      ? "25%"
                      : "0%",
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              ></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-4">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  ["PENDING", "PROCESSING", "COMPLETED"].includes(
                    orderData.status
                  )
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                {["PENDING", "PROCESSING", "COMPLETED"].includes(
                  orderData.status
                ) && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    ["PENDING", "PROCESSING", "COMPLETED"].includes(
                      orderData.status
                    )
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  Pesanan Diterima
                </p>
                {["PENDING", "PROCESSING", "COMPLETED"].includes(
                  orderData.status
                ) && (
                  <p className="text-xs text-gray-500">
                    {formatDate(orderData.created_at)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  ["PROCESSING", "COMPLETED"].includes(orderData.status)
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                {["PROCESSING", "COMPLETED"].includes(orderData.status) && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    ["PROCESSING", "COMPLETED"].includes(orderData.status)
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  Sedang Diproses
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  orderData.status === "COMPLETED"
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                {orderData.status === "COMPLETED" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    orderData.status === "COMPLETED"
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  Pesanan Selesai
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Informasi Pesanan
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama Pemesan</span>
                <span className="font-medium">{orderData.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meja</span>
                <span className="font-medium">
                  Meja {orderData.table.number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Pesanan</span>
                <span className="font-medium">
                  {formatDate(orderData.created_at)}
                </span>
              </div>
              {orderData.note && (
                <div>
                  <span className="text-gray-600">Catatan:</span>
                  <p className="mt-1 text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                    {orderData.note}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
            <div className="px-6 py-4 bg-indigo-600 text-white">
              <h2 className="text-lg font-semibold">Detail Item Pesanan</h2>
            </div>
            <div className="p-6">
              {orderData.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between border-b border-gray-200 py-4 last:border-b-0"
                >
                  <div className="flex">
                    <div className="h-16 w-16 relative rounded-md overflow-hidden flex-shrink-0">
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
                      <div className="text-sm text-gray-500 mt-1">
                        {formatCurrency(item.menu.price)} x {item.quantity}
                      </div>
                      {item.note && (
                        <div className="text-xs text-gray-500 mt-1 italic">
                          Catatan: {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Ringkasan Pembayaran
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(orderData.total_price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pajak (0%)</span>
                <span className="font-medium">{formatCurrency(0)}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">Total</span>
                <span className="text-indigo-600 text-lg">
                  {formatCurrency(orderData.total_price)}
                </span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              <div className="flex justify-between font-medium">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span>Tunai</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => window.print()}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center"
            >
              <FaPrint className="mr-2" />
              Cetak Struk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
