"use client";
import React, { useState } from "react";
import Sidebar from "../_components/sidebar";
import Navbar from "../_components/navbar";
import { FaPlus, FaQrcode, FaTrash, FaHome, FaPrint } from "react-icons/fa";
import Link from "next/link";
import QRCode from "qrcode"; // Import library qrcode

const MejaPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("meja");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedMeja, setSelectedMeja] = useState({
    no: "",
    namaMeja: "",
    qrCode: "",
    isOccupied: false, // Status meja: true jika sedang digunakan
  });
  const [data, setData] = useState([
    {
      no: "1",
      namaMeja: "Meja 1",
      qrCode: "https://restorananda.com/order?table=1", // Contoh data QR Code
      isOccupied: false,
    },
    {
      no: "2",
      namaMeja: "Meja 2",
      qrCode: "https://restorananda.com/order?table=2", // Contoh data QR Code
      isOccupied: false,
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  // Fungsi untuk membuka modal tambah meja
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  // Fungsi untuk generate QR Code
  const handleGenerateQR = (no: string, namaMeja: string) => {
    const qrCodeData = `https://restorananda.com/order?table=${no}`; // Data untuk QR Code
    setSelectedMeja({ no, namaMeja, qrCode: qrCodeData, isOccupied: false });
    setIsQRModalOpen(true);
  };

  // Fungsi untuk menyimpan data meja baru
  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeja = {
      no: selectedMeja.no,
      namaMeja: selectedMeja.namaMeja,
      qrCode: `https://restorananda.com/order?table=${selectedMeja.no}`, // Generate QR Code berdasarkan No/ID
      isOccupied: false,
    };
    setData([...data, newMeja]); // Tambahkan data baru ke state
    setIsAddModalOpen(false);
    setSelectedMeja({ no: "", namaMeja: "", qrCode: "", isOccupied: false }); // Reset form
  };

  // Fungsi untuk menghapus data meja
  const handleDelete = (no: string) => {
    setData(data.filter((item) => item.no !== no));
  };

  // Fungsi untuk mencetak QR Code
  const handlePrintQR = async (qrCode: string, namaMeja: string) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      // Generate QR Code sebagai data URL PNG
      const qrImageSrc = await QRCode.toDataURL(qrCode, {
        width: 300, // Lebar gambar QR Code
        margin: 2, // Margin di sekitar QR Code
      });

      // Tampilkan QR Code di jendela cetak
      printWindow.document.write(`
        <html>
          <head>
            <title>Cetak QR Code Meja ${namaMeja}</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
                font-family: Arial, sans-serif; 
              }
              .qr-container { 
                text-align: center; 
                padding: 20px; 
                border: 2px solid #000; 
                border-radius: 10px; 
                background-color: #fff; 
              }
              .qr-code { 
                width: 300px; 
                height: 300px; 
                margin-bottom: 20px; 
              }
              .info { 
                font-size: 18px; 
                font-weight: bold; 
                color: #333; 
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <div class="info">Meja: ${namaMeja}</div>
              <img src="${qrImageSrc}" alt="QR Code" class="qr-code" />
              <div class="info">Scan QR Code untuk memesan</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Fungsi untuk menandai meja sebagai digunakan
  const handleOccupyTable = (no: string) => {
    setData(
      data.map((item) =>
        item.no === no ? { ...item, isOccupied: true } : item
      )
    );
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
                    href="/admin/meja"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3533A1] md:ml-2"
                  >
                    Meja
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="ml-1 text-sm font-medium text-[#3533A1] md:ml-2">
                    Data Meja
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header dan Tombol Tambah */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3533A1]">Data Meja</h1>
            <button
              onClick={handleAdd}
              className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] flex items-center"
            >
              <FaPlus className="mr-2" /> Tambah Meja
            </button>
          </div>

          {/* Tabel Data Meja */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">No/ID</th>
                  <th className="px-6 py-3 text-left">Nama Meja</th>
                  <th className="px-6 py-3 text-left">QR Code</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.no} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.no}</td>
                    <td className="px-6 py-4">{item.namaMeja}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${item.qrCode}`}
                        alt="QR Code"
                        className="rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          item.isOccupied
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.isOccupied ? "Digunakan" : "Tersedia"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleGenerateQR(item.no, item.namaMeja)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center"
                      >
                        <FaQrcode className="mr-1" /> Buat QR Code
                      </button>
                      <button
                        onClick={() =>
                          handlePrintQR(item.qrCode, item.namaMeja)
                        }
                        className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 flex items-center"
                      >
                        <FaPrint className="mr-1" /> Cetak
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Tambah Meja
            </h2>
            <form onSubmit={handleSaveAdd}>
              <div className="mb-4">
                <label className="block text-gray-700">No/ID</label>
                <input
                  type="text"
                  value={selectedMeja.no}
                  onChange={(e) =>
                    setSelectedMeja({ ...selectedMeja, no: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Meja</label>
                <input
                  type="text"
                  value={selectedMeja.namaMeja}
                  onChange={(e) =>
                    setSelectedMeja({
                      ...selectedMeja,
                      namaMeja: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsQRModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              QR Code Meja
            </h2>
            <div className="flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedMeja.qrCode}`}
                alt="QR Code"
                className="rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-4">
                Scan QR Code untuk meja:{" "}
                <strong>{selectedMeja.namaMeja}</strong>
              </p>
              <button
                onClick={() => {
                  handleOccupyTable(selectedMeja.no);
                  setIsQRModalOpen(false);
                }}
                className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] mb-2"
              >
                Tandai Digunakan
              </button>
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MejaPage;
