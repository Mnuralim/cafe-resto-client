"use client";
import React, { useState } from "react";
import Sidebar from "../../_components/sidebar";
import Navbar from "../../_components/navbar";
import { FaPlus, FaEdit, FaTrash, FaHome } from "react-icons/fa";
import Link from "next/link";

const MenuPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("menu");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({
    no: "",
    menu: "",
    kategori: "",
    harga: "",
    stok: "",
    gambar: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [data, setData] = useState([
    {
      no: "1",
      menu: "Burger",
      kategori: "Makanan",
      harga: "Rp 25.000",
      stok: "Ready",
      gambar: "/assets/menu/burger.png",
    },
    {
      no: "2",
      menu: "Coca-Cola",
      kategori: "Minuman",
      harga: "Rp 10.000",
      stok: "Kosong",
      gambar: "/assets/menu/pizza.png",
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  const handleAdd = () => {
    setIsAddModalOpen(true);
    setPreviewImage(null);
  };

  const handleEdit = (
    no: string,
    menu: string,
    kategori: string,
    harga: string,
    stok: string
  ) => {
    setSelectedMenu({ no, menu, kategori, harga, stok, gambar: "" });
    setIsEditModalOpen(true);
    setPreviewImage(null);
  };

  const handleDelete = (no: string) => {
    setSelectedMenu({
      no,
      menu: "",
      kategori: "",
      harga: "",
      stok: "",
      gambar: "",
    });
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setData(data.filter((item) => item.no !== selectedMenu.no));
    setIsDeleteModalOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex">
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#3533A1] transition-colors"
                >
                  <FaHome className="mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <Link
                    href="/admin/menu"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3533A1] transition-colors md:ml-2"
                  >
                    Menu
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="ml-1 text-sm font-medium text-[#3533A1] md:ml-2">
                    Daftar Menu
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header dan Tombol Tambah */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3533A1]">Daftar Menu</h1>
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-[#6A67CE] to-[#3533A1] text-white px-4 py-2 rounded-lg hover:from-[#3533A1] hover:to-[#6A67CE] transition-all flex items-center shadow-lg"
            >
              <FaPlus className="mr-2" /> Tambah Menu
            </button>
          </div>

          {/* Tabel Data Menu */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#6A67CE] to-[#3533A1] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">Menu</th>
                  <th className="px-6 py-4 text-left">Kategori</th>
                  <th className="px-6 py-4 text-left">Harga</th>
                  <th className="px-6 py-4 text-left">Stok</th>
                  <th className="px-6 py-4 text-left">Gambar</th>
                  <th className="px-6 py-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.no}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">{item.no}</td>
                    <td className="px-6 py-4">{item.menu}</td>
                    <td className="px-6 py-4">{item.kategori}</td>
                    <td className="px-6 py-4">{item.harga}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          item.stok === "Ready"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.stok}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item.gambar}
                        alt={item.menu}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() =>
                          handleEdit(
                            item.no,
                            item.menu,
                            item.kategori,
                            item.harga,
                            item.stok
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors flex items-center shadow-md"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.no)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center shadow-md"
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
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative z-50 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#3533A1] mb-4">
              Tambah Menu
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">No</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Menu</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Kategori</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                  value={selectedMenu.kategori}
                  onChange={(e) =>
                    setSelectedMenu({
                      ...selectedMenu,
                      kategori: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Seafood">Seafood</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Harga</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Stok</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stok"
                      value="Ready"
                      checked={selectedMenu.stok === "Ready"}
                      onChange={(e) =>
                        setSelectedMenu({
                          ...selectedMenu,
                          stok: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    Tersedia
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stok"
                      value="Kosong"
                      checked={selectedMenu.stok === "Kosong"}
                      onChange={(e) =>
                        setSelectedMenu({
                          ...selectedMenu,
                          stok: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    Kosong
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Gambar</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
                {previewImage && (
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
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveAdd}
                  className="bg-gradient-to-r from-[#6A67CE] to-[#3533A1] text-white px-4 py-2 rounded-lg hover:from-[#3533A1] hover:to-[#6A67CE] transition-all shadow-md"
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
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative z-50 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#3533A1] mb-4">
              Edit Menu
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">No</label>
                <input
                  type="text"
                  value={selectedMenu.no}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Menu</label>
                <input
                  type="text"
                  value={selectedMenu.menu}
                  onChange={(e) =>
                    setSelectedMenu({
                      ...selectedMenu,
                      menu: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Kategori</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                  value={selectedMenu.kategori}
                  onChange={(e) =>
                    setSelectedMenu({
                      ...selectedMenu,
                      kategori: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Seafood">Seafood</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Harga</label>
                <input
                  type="text"
                  value={selectedMenu.harga}
                  onChange={(e) =>
                    setSelectedMenu({
                      ...selectedMenu,
                      harga: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Stok</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stok"
                      value="Ready"
                      checked={selectedMenu.stok === "Ready"}
                      onChange={(e) =>
                        setSelectedMenu({
                          ...selectedMenu,
                          stok: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    Tersedia
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stok"
                      value="Kosong"
                      checked={selectedMenu.stok === "Kosong"}
                      onChange={(e) =>
                        setSelectedMenu({
                          ...selectedMenu,
                          stok: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    Kosong
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Gambar</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
                />
                {previewImage && (
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
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-gradient-to-r from-[#6A67CE] to-[#3533A1] text-white px-4 py-2 rounded-lg hover:from-[#3533A1] hover:to-[#6A67CE] transition-all shadow-md"
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
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative z-50 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#3533A1] mb-4">
              Hapus Menu
            </h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus menu ini?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
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

export default MenuPage;
