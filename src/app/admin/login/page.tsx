"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import sweetalert2
import { login } from "@/lib/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State untuk pesan error
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message);
      }
      router.push("/admin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login gagal");
      Swal.fire({
        title: "Login Gagal!",
        text: error instanceof Error ? error.message : "Login gagal",
        icon: "error",
        confirmButtonColor: "#6A67CE",
        confirmButtonText: "OK",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 fixed top-0 left-0 w-full"
      style={{
        background:
          "linear-gradient(135deg, #6A67CE 0%, #3533A1 50%, #1E1D5A 100%)",
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3533A1] mb-2">
            Login Admin
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan username"
                required
              />
              <FaUser className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] focus:border-transparent pr-10 text-sm sm:text-base"
                placeholder="Masukkan password"
                required
              />
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#6A67CE]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-300 text-sm sm:text-base ${
                isFormValid
                  ? "bg-[#6A67CE] text-white hover:bg-[#3533A1] hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
