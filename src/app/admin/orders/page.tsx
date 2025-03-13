"use client";
import React, { useState } from "react";
import Sidebar from "../_components/sidebar";
import Navbar from "../_components/navbar";
import { FaEdit, FaTrash, FaHome, FaQrcode } from "react-icons/fa";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react"; // Library untuk generate QR Code

const OrdersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("orders");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    no: "",
    qrCode: "",
    namaPemesan: "",
    jumlahPemesan: "",
    meja: "",
    menu: "",
    jumlahPesanan: "",
    totalHarga: "",
    status: "",
    tanggalBuat: "",
    deskripsiPesanan: "", // Tambahan field deskripsi pesanan
  });
  const [data, setData] = useState([
    {
      no: "1",
      qrCode: "https://example.com/order/1",
      namaPemesan: "John Doe",
      jumlahPemesan: "4",
      meja: "Meja 1",
      menu: "Burger, Coca-Cola",
      jumlahPesanan: "2",
      totalHarga: "Rp 70.000",
      status: "Selesai",
      tanggalBuat: "2023-10-01",
      deskripsiPesanan: "Tanpa acar, tambah saus", // Contoh deskripsi pesanan
    },
    {
      no: "2",
      qrCode: "https://example.com/order/2",
      namaPemesan: "Jane Smith",
      jumlahPemesan: "2",
      meja: "Meja 3",
      menu: "Pizza, Air Mineral",
      jumlahPesanan: "2",
      totalHarga: "Rp 50.000",
      status: "Proses",
      tanggalBuat: "2023-10-02",
      deskripsiPesanan: "Pizza pedas, tanpa bawang", // Contoh deskripsi pesanan
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  // Fungsi untuk membuka modal edit order
  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk membuka modal hapus order
  const handleDelete = (no: string) => {
    setSelectedOrder(data.find((item) => item.no === no)!);
    setIsDeleteModalOpen(true);
  };

  // Fungsi untuk menyimpan perubahan data order
  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.no === selectedOrder.no ? selectedOrder : item
    );
    setData(updatedData);
    setIsEditModalOpen(false);
  };

  // Fungsi untuk menghapus data order
  const handleConfirmDelete = () => {
    setData(data.filter((item) => item.no !== selectedOrder.no));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
        closeSidebar={closeSidebar}
      />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6">
          {/* Breadcrumb Navigation */}
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
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">QR Code</th>
                  <th className="px-6 py-3 text-left">Nama Pemesan</th>
                  <th className="px-6 py-3 text-left">Jumlah Orang</th>
                  <th className="px-6 py-3 text-left">Meja</th>
                  <th className="px-6 py-3 text-left">Menu</th>
                  <th className="px-6 py-3 text-left">Jumlah Pesanan</th>
                  <th className="px-6 py-3 text-left">Total Harga</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Deskripsi Pesanan</th>
                  <th className="px-6 py-3 text-left">Tanggal Buat</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.no} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.no}</td>
                    <td className="px-6 py-4">
                      <QRCodeSVG
                        value={item.qrCode}
                        size={50}
                        className="rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">{item.namaPemesan}</td>
                    <td className="px-6 py-4">{item.jumlahPemesan}</td>
                    <td className="px-6 py-4">{item.meja}</td>
                    <td className="px-6 py-4">{item.menu}</td>
                    <td className="px-6 py-4">{item.jumlahPesanan}</td>
                    <td className="px-6 py-4">{item.totalHarga}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          item.status === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.deskripsiPesanan}</td>
                    <td className="px-6 py-4">{item.tanggalBuat}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.no)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center"
                      >
                        <FaTrash className="mr-1" /> Hapus
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
                  value={selectedOrder.namaPemesan}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      namaPemesan: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jumlah Pemesan</label>
                <input
                  type="number"
                  value={selectedOrder.jumlahPemesan}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      jumlahPemesan: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Meja</label>
                <input
                  type="text"
                  value={selectedOrder.meja}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      meja: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Menu</label>
                <input
                  type="text"
                  value={selectedOrder.menu}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      menu: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jumlah Pesanan</label>
                <input
                  type="number"
                  value={selectedOrder.jumlahPesanan}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      jumlahPesanan: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Harga</label>
                <input
                  type="text"
                  value={selectedOrder.totalHarga}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      totalHarga: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Deskripsi Pesanan</label>
                <textarea
                  value={selectedOrder.deskripsiPesanan}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      deskripsiPesanan: e.target.value,
                    })
                  }
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
                  onClick={handleSaveEdit}
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
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
