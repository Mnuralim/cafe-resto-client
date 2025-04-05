"use client";
import React, { useState } from "react";
import Sidebar from "../_components/sidebar";
import Navbar from "../_components/navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  // Data untuk grafik pendapatan
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
    datasets: [
      {
        label: "Pendapatan",
        data: [100000, 150000, 200000, 250000, 300000, 350000, 400000],
        borderColor: "#6A67CE",
        backgroundColor: "rgba(106, 103, 206, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Grafik Pendapatan Bulanan",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1">
        {/* Statistik Pendapatan, Menu, Meja, dan Orders */}
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card Pendapatan */}
            <div className="bg-gradient-to-r from-[#6A67CE] to-[#4FD1C5] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">Rp 300.000</h2>
              <p className="text-sm">Pendapatan</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">+10% dari bulan lalu</span>
                <span className="text-xs">📈</span>
              </div>
            </div>

            {/* Card Menu */}
            <div className="bg-gradient-to-r from-[#F6AD55] to-[#FF6B6B] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">4</h2>
              <p className="text-sm">Menu</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">+2 menu baru</span>
                <span className="text-xs">🍽️</span>
              </div>
            </div>

            {/* Card Meja */}
            <div className="bg-gradient-to-r from-[#4FD1C5] to-[#6A67CE] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">3</h2>
              <p className="text-sm">Meja</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">1 meja tersedia</span>
                <span className="text-xs">🪑</span>
              </div>
            </div>

            {/* Card Orders */}
            <div className="bg-gradient-to-r from-[#FF6B6B] to-[#F6AD55] p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg font-bold">15</h2>
              <p className="text-sm">Orders</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs">5 orders baru</span>
                <span className="text-xs">📦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grafik Pendapatan */}
        <div className="p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Chart Pendapatan
            </h2>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
