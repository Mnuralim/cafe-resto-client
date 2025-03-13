"use client";
import React, { useState } from "react";
import Sidebar from "../_components/sidebar";
import Navbar from "../_components/navbar";
import {
  FaHome,
  FaSignOutAlt,
  FaSave,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import sweetalert2

const AccountPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("account");
  const [isEditMode, setIsEditMode] = useState(false); // State untuk mode edit
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
  const router = useRouter();

  // Data akun admin (state awal)
  const [adminData, setAdminData] = useState({
    username: "admin123",
    password: "password123", // Password default
  });

  // State untuk input form
  const [formData, setFormData] = useState({
    username: adminData.username,
    password: adminData.password,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleMenuClick = (menu: string) => setActiveMenu(menu);

  // Fungsi untuk handle perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fungsi untuk handle update data dengan alert sukses
  const handleUpdate = () => {
    setAdminData({
      username: formData.username,
      password: formData.password,
    });
    setIsEditMode(false); // Kembali ke mode read-only setelah update

    // Tampilkan alert sukses
    Swal.fire({
      title: "Sukses!",
      text: "Data akun berhasil diupdate.",
      icon: "success",
      confirmButtonColor: "#6A67CE",
      confirmButtonText: "OK",
    });
  };

  // Fungsi untuk handle logout dengan alert konfirmasi
  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari halaman ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A67CE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/admin/login"); // Redirect ke halaman login
      }
    });
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
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="ml-1 text-sm font-medium text-[#3533A1] md:ml-2">
                    Akun Admin
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#3533A1]">Akun Admin</h1>
          </div>

          {/* Form Akun Admin */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1]"
                  />
                ) : (
                  <input
                    type="text"
                    value={adminData.username}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                {isEditMode ? (
                  <>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3533A1] pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500 hover:text-[#3533A1]" />
                      ) : (
                        <FaEye className="text-gray-500 hover:text-[#3533A1]" />
                      )}
                    </button>
                  </>
                ) : (
                  <input
                    type="password"
                    value={adminData.password}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end space-x-4">
                {isEditMode ? (
                  <>
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] flex items-center"
                    >
                      <FaSave className="mr-2" /> Simpan
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="bg-[#6A67CE] text-white px-4 py-2 rounded-lg hover:bg-[#3533A1] flex items-center"
                  >
                    <FaSave className="mr-2" /> Update
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
