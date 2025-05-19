"use client";

import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Modal } from "../../_components/modal";
import { createMenu, deleteMenu, updateMenu } from "@/lib/api";
import Swal from "sweetalert2";
import { customRevaldation } from "@/action";
import Image from "next/image";
import { FilterControll } from "./filter-controll";

interface Props {
  data: MenuApiResponse;
  categories: ICategory[];
  currentSortMenu?: string;
}

export const ListMenu = ({ data, categories, currentSortMenu }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [menu, setMenu] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleAddClick = () => {
    setModalMode("add");
    setSelectedId(null);
    setMenu("");
    setCategory("");
    setPrice(0);
    setStock("");
    setImage(null);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: IMenu) => {
    setModalMode("edit");
    setSelectedId(item.id);
    setMenu(item.name);
    setCategory(item.category.id);
    setPrice(item.price);
    setStock(item.status ? "Tersedia" : "Kosong");
    setPreviewImage(item.image);
    setImage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!menu || !category || !price) {
        throw new Error("Semua field harus diisi");
      }

      let response;
      const formData = new FormData();
      formData.append("name", menu);
      formData.append("categoryId", category);
      formData.append("price", price.toString());
      formData.append("status", stock === "Tersedia" ? "1" : "0");
      if (image) formData.append("image", image);

      if (selectedId) {
        response = await updateMenu(selectedId, formData);
      } else {
        if (!image) throw new Error("Gambar harus diisi");
        response = await createMenu(formData);
      }

      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message);

      Swal.fire({
        title: "Berhasil!",
        text: selectedId
          ? "Menu berhasil diperbarui"
          : "Menu berhasil ditambahkan",
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });

      customRevaldation("/admin/menu", "page");
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
        icon: "error",
        confirmButtonColor: "#6A67CE",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Menu ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A67CE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      setDeletingId(id);
      try {
        const response = await deleteMenu(id);
        if (!response.ok) throw new Error("Gagal menghapus menu");

        Swal.fire({
          title: "Terhapus!",
          text: "Menu berhasil dihapus.",
          icon: "success",
          confirmButtonColor: "#6A67CE",
        });

        customRevaldation("/admin/menu", "page");
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: error instanceof Error ? error.message : "Terjadi kesalahan",
          icon: "error",
          confirmButtonColor: "#6A67CE",
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Render mobile card view for each menu item
  const renderMenuCard = (item: IMenu, index: number) => (
    <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <span className="text-gray-500 text-sm">#{index + 1}</span>
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={400}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="text-gray-700">
            <span className="font-medium">Kategori:</span> {item.category.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Harga:</span> Rp{" "}
            {item.price.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-sm ${
                item.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleEditClick(item)}
          className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center shadow-md disabled:opacity-50 flex-1"
          disabled={isSubmitting || deletingId !== null}
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center shadow-md disabled:opacity-50 flex-1"
          disabled={deletingId === item.id}
        >
          {deletingId === item.id ? (
            "Menghapus..."
          ) : (
            <>
              <FaTrash className="mr-1" /> Hapus
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#3533A1]">
          Daftar Menu
        </h1>
        <button
          onClick={handleAddClick}
          className="bg-gradient-to-r from-[#6A67CE] to-[#3533A1] text-white px-4 py-2 rounded-lg hover:from-[#3533A1] hover:to-[#6A67CE] transition-all flex items-center shadow-lg w-full sm:w-auto justify-center sm:justify-start"
        >
          <FaPlus className="mr-2" /> Tambah Menu
        </button>
      </div>

      <FilterControll
        categories={categories}
        currentSortMenu={currentSortMenu}
      />

      {/* Mobile view (cards) */}
      <div className="md:hidden">
        {data.data.map((item, index) => renderMenuCard(item, index))}
      </div>

      {/* Desktop view (table) */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
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
              {data.data.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.category.name}</td>
                  <td className="px-6 py-4">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        item.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors flex items-center shadow-md disabled:opacity-50"
                      disabled={isSubmitting || deletingId !== null}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center shadow-md disabled:opacity-50"
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? (
                        "Menghapus..."
                      ) : (
                        <>
                          <FaTrash className="mr-1" /> Hapus
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl md:text-2xl font-bold text-[#3533A1] mb-4">
          {modalMode === "add" ? "Tambah Menu" : "Edit Menu"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Menu</label>
            <input
              type="text"
              placeholder="Masukkan menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Kategori</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Harga</label>
            <input
              type="number"
              placeholder="Masukkan harga"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Stok</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stok"
                  value="Tersedia"
                  checked={stock === "Tersedia"}
                  onChange={(e) => setStock(e.target.value)}
                  className="mr-2"
                />
                Tersedia
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stok"
                  value="Kosong"
                  checked={stock === "Kosong"}
                  onChange={(e) => setStock(e.target.value)}
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
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6A67CE] file:text-white hover:file:bg-[#3533A1]"
            />
            {previewImage && (
              <div className="mt-2 flex justify-center sm:justify-start">
                <Image
                  width={400}
                  height={400}
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="order-2 sm:order-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="order-1 sm:order-2 sm:flex-1 bg-[#6A67CE] hover:bg-[#3533A1] text-white py-2 rounded-lg transition-all disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? modalMode === "edit"
                  ? "Menyimpan..."
                  : "Menambahkan..."
                : modalMode === "edit"
                ? "Simpan Perubahan"
                : "Tambah Menu"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
