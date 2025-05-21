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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-4 mb-8">
          <div className="lg:col-span-2 p-6 lg-ml-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2 inline-block text-gray-700">
              Penjualan Mingguan
            </h3>
            <div className="h-72 [&_.recharts-cartesian-grid-horizontal]:stroke-gray-100 [&_.recharts-cartesian-grid-vertical]:stroke-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sales}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="gradientBar"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6A67CE" />
                      <stop offset="100%" stopColor="#4FD1C5" />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="day"
                    axisLine={{ stroke: "#CBD5E0", strokeWidth: 1 }}
                    tickLine={false}
                    tick={{
                      fill: "#4A5568",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                    }}
                  />

                  <YAxis
                    axisLine={{ stroke: "#CBD5E0", strokeWidth: 1 }}
                    tickLine={false}
                    tick={{
                      fill: "#4A5568",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                    }}
                    tickFormatter={(value) => `${value / 1000}K`}
                    width={50}
                  />

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(parseFloat(value.toString()))
                    }
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.96)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(4px)",
                      fontWeight: "600",
                      color: "#2D3748",
                      fontSize: "0.875rem",
                    }}
                    itemStyle={{
                      color: "#6A67CE",
                      padding: "0.25rem 0",
                    }}
                  />

                  <Bar
                    dataKey="sales"
                    fill="url(#gradientBar)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
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
