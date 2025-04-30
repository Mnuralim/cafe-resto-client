"use client";
import React, { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FaSearch, FaClipboardList } from "react-icons/fa";
import { useOrderHistoryStore } from "@/store/order-history";
import { PreserveLink } from "@/app/_components/preserver-link";

export const UserOrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { orders } = useOrderHistoryStore();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto pt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Riwayat Pesanan
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border text-black border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Cari berdasarkan ID atau nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {sortedOrders.length > 0 ? (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <PreserveLink
                href={`/history/${order.id}`}
                key={order.id}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-200 hover:shadow-md">
                  <div className="p-4 border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
                      <div>
                        <div className="flex items-center">
                          <FaClipboardList className="text-indigo-500 mr-2" />
                          <h3 className="font-medium">
                            Pesanan #{order.id.substring(0, 8)}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center mt-2 md:mt-0">
                        <div className="font-bold text-indigo-600">
                          {formatCurrency(order.total_price)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex text-sm text-gray-600">
                        <span className="mr-3">Meja {order.table.number}</span>
                        <span>{order.orderItems.length} item</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PreserveLink>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-500 mb-2">
              {searchTerm
                ? "Tidak ada pesanan yang sesuai dengan pencarian"
                : "Belum ada riwayat pesanan"}
            </div>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                }}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset pencarian
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
