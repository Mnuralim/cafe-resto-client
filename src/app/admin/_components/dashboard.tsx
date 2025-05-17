"use client";

import { formatCurrency } from "@/lib/utils";
import { CgLock } from "react-icons/cg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  stats: IStats;
  sales: IWeeklySales[];
}

export const DashboardAdmin = ({ stats, sales }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-[#6A67CE] to-[#4FD1C5] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">
                {formatCurrency(stats.totalSales)}
              </h2>
              <p className="text-sm">Total Penjualan</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">
                  {stats.salesChangePercentage}% dari kemarin
                </span>
                <span className="text-xs">📈</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#F6AD55] to-[#FF6B6B] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">{stats.totalOrders}</h2>
              <p className="text-sm">Total Pesanan</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">
                  {stats.ordersChangePercentage}% dari kemarin
                </span>
                <span className="text-xs">🍽️</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#4FD1C5] to-[#6A67CE] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">{stats.completedOrders}</h2>
              <p className="text-sm">Pesanan Selesai</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">
                  {stats.completedOrdersChangePercentage}% dari kemarin
                </span>
                <span className="text-xs">🪑</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#F6AD55] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">{stats.processingOrders}</h2>
              <p className="text-sm">Pesanan Diproses</p>
              <div className="mt-4 flex items-center justify-between">
                <CgLock size={14} className="mr-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2  p-6 ">
            <h3 className="text-xl font-black mb-4 border-b-4 border-indigo-500 pb-2 inline-block">
              Penjualan Mingguan
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sales}>
                  <XAxis dataKey="day" stroke="#374151" fontWeight="bold" />
                  <YAxis
                    stroke="#374151"
                    fontWeight="bold"
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(parseFloat(value.toString()))
                    }
                    contentStyle={{
                      borderRadius: 0,
                      border: "2px solid #1f2937",
                      fontWeight: "bold",
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#4f46e5"
                    stroke="#1f2937"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
