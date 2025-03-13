"use client";
import React, { useState } from "react";
import Sidebar from "../../_components/sidebar";
import Navbar from "../../_components/navbar";
import { FaPlus, FaEdit, FaTrash, FaHome } from "react-icons/fa";
import Link from "next/link";

const KategoriPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("kategori");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState({
    no: "",
    kategori: "",
    namaFile: "",
    gambar: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State untuk preview gambar
  const [data, setData] = useState([
    {
      no: "1",
      kategori: "Makanan",
      namaFile: "food_category.png",
      gambar: "/assets/menu/burger.png", // Path gambar dari folder public
    },
    {
      no: "2",
      kategori: "Minuman",
      namaFile: "drink_category.png",
      gambar: "/assets/menu/teh.png", // Path gambar dari folder public
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  const handleAdd = () => {
    setIsAddModalOpen(true);
    setPreviewImage(null); // Reset preview gambar saat modal tambah dibuka
  };

  const handleEdit = (
    no: string,
    kategori: string,
    namaFile: string,
    gambar: string
  ) => {
    setSelectedKategori({ no, kategori, namaFile, gambar });
    setIsEditModalOpen(true);
    setPreviewImage(null); // Reset preview gambar saat modal edit dibuka
  };

  const handleDelete = (no: string) => {
    setSelectedKategori({
      no,
      kategori: "",
      namaFile: "",
      gambar: "",
    });
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    // Simpan data baru ke state atau API
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    // Simpan perubahan ke state atau API
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Hapus data dari state atau API
    setData(data.filter((item) => item.no !== selectedKategori.no));
    setIsDeleteModalOpen(false);
  };

  // Fungsi untuk menangani perubahan input file
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Set preview gambar
      };
      reader.readAsDataURL(file);
    }
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
                    href="/admin/kategori"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3533A1] md:ml-2"
                  >
                    Kategori
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="ml-1 text-sm font-medium text-[#3533A1] md:ml-2">
                    Daftar Kategori
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header dan Tombol Tambah */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3533A1]">
              Daftar Kategori
            </h1>
            <button
              onClick={handleAdd}
              className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] flex items-center"
            >
              <FaPlus className="mr-2" /> Tambah Kategori
            </button>
          </div>

          {/* Tabel Data Kategori */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">Kategori</th>
                  <th className="px-6 py-3 text-left">Nama File</th>
                  <th className="px-6 py-3 text-left">Gambar</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.no} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.no}</td>
                    <td className="px-6 py-4">{item.kategori}</td>
                    <td className="px-6 py-4">{item.namaFile}</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.gambar} // Gambar diambil dari folder public
                        alt={item.kategori}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() =>
                          handleEdit(
                            item.no,
                            item.kategori,
                            item.namaFile,
                            item.gambar
                          )
                        }
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Tambah Kategori
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">No</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kategori</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama File</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gambar</label>
                <input
                  type="file"
                  onChange={handleImageChange} // Menangani perubahan file
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {previewImage && ( // Tampilkan preview gambar jika ada
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview Gambar"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                )}
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
                  type="button"
                  onClick={handleSaveAdd}
                  className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Edit Kategori
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">No</label>
                <input
                  type="text"
                  value={selectedKategori.no}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Kategori</label>
                <input
                  type="text"
                  value={selectedKategori.kategori}
                  onChange={(e) =>
                    setSelectedKategori({
                      ...selectedKategori,
                      kategori: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nama File</label>
                <input
                  type="text"
                  value={selectedKategori.namaFile}
                  onChange={(e) =>
                    setSelectedKategori({
                      ...selectedKategori,
                      namaFile: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gambar</label>
                <input
                  type="file"
                  onChange={handleImageChange} // Menangani perubahan file
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {previewImage && ( // Tampilkan preview gambar jika ada
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview Gambar"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                )}
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
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              Hapus Kategori
            </h2>
            <p className="mb-4">
              Apakah Anda yakin ingin menghapus kategori ini?
            </p>
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

export default KategoriPage;
