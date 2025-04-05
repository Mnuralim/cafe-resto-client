"use client";
import React, { useState } from "react";
import { FaPlus, FaTrash, FaHome, FaPrint } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Link from "next/link";
import QRCode from "qrcode";
import Image from "next/image";
import Swal from "sweetalert2";

import { createTable, deleteTable, updateTable } from "@/lib/api";
import { customRevaldation } from "@/action";

interface Props {
  tables: ITable[];
}

export const ListTable = ({ tables }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(
    null
  );
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const openAddModal = () => {
    setSelectedTableNumber(null);
    setSelectedTableId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string, number: number) => {
    setSelectedTableId(id);
    setSelectedTableNumber(number);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedTableNumber) {
        throw new Error("Nomor meja belum diisi");
      }

      let response;
      if (selectedTableId) {
        response = await updateTable(selectedTableId, selectedTableNumber);
      } else {
        response = await createTable(selectedTableNumber);
      }

      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message);

      Swal.fire({
        title: "Berhasil!",
        text: selectedTableId
          ? "Meja berhasil diperbarui"
          : "Meja berhasil ditambahkan",
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });

      customRevaldation("/admin/table", "page");
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error instanceof Error ? error.message : "Terjadi kesalahan",
        icon: "error",
        confirmButtonColor: "#6A67CE",
      });
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan menghapus meja ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A67CE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTable(id);
          const resJson = await response.json();
          if (!response.ok) throw new Error(resJson.message);

          Swal.fire({
            title: "Berhasil!",
            text: "Meja berhasil dihapus",
            icon: "success",
            confirmButtonColor: "#6A67CE",
          });

          customRevaldation("/admin/table", "page");
        } catch (error) {
          Swal.fire({
            title: "Gagal menghapus meja!",
            text: error instanceof Error ? error.message : "Terjadi kesalahan",
            icon: "error",
            confirmButtonColor: "#6A67CE",
          });
        }
      }
    });
  };

  const handlePrintQR = async (qrCode: string, tableNumber: number) => {
    try {
      const qrImageSrc = await QRCode.toDataURL(qrCode, {
        width: 300,
        margin: 2,
      });

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Popup blocker terdeteksi!");
        return;
      }

      printWindow.document.write(`
        <html>
          <head><title>Cetak QR Code Meja ${tableNumber}</title></head>
          <body style="text-align:center">
            <h2>Meja ${tableNumber}</h2>
            <img src="${qrImageSrc}" style="width:300px;height:300px" />
            <p>Scan QR Code untuk memesan</p>
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              }
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    } catch (error) {
      console.error("Error printing QR code:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 p-6">
        <nav className="flex mb-6">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <Link
                href="/admin/dashboard"
                className="text-sm text-gray-700 hover:text-[#3533A1] flex items-center"
              >
                <FaHome className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
              <Link
                href="/admin/meja"
                className="text-sm text-gray-700 hover:text-[#3533A1] ml-2"
              >
                Meja
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
              <span className="text-sm text-[#3533A1] ml-2">Data Meja</span>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#3533A1]">Data Meja</h1>
          <button
            onClick={openAddModal}
            className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Meja
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#3533A1] text-white">
              <tr>
                <th className="px-6 py-3 text-left">No/ID</th>
                <th className="px-6 py-3 text-left">Nama Meja</th>
                <th className="px-6 py-3 text-left">QR Code</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">Meja {item.number}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_QR_SERVER}/?size=160x160&data=${item.qr_code}`}
                      alt={`QR ${item.number}`}
                      width={160}
                      height={160}
                      className="aspect-square"
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handlePrintQR(item.qr_code, item.number)}
                      className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 flex items-center"
                    >
                      <FaPrint className="mr-1" /> Cetak
                    </button>
                    <button
                      onClick={() => handleEdit(item.id, item.number)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center"
                    >
                      <FaPencil className="mr-1" /> Perbarui
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
            <h2 className="text-xl font-bold text-[#3533A1] mb-4">
              {selectedTableId ? "Perbarui Meja" : "Tambah Meja"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700">Nomor Meja</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  value={selectedTableNumber ?? ""}
                  onChange={(e) =>
                    setSelectedTableNumber(Number(e.target.value))
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};
