"use client";

import { customRevaldation } from "@/action";
import { updateAdmin, updateLocationSettings } from "@/lib/api";
import React, { useState } from "react";
import { BiGlobe, BiMapPin, BiSave, BiShield } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

interface AdminSettings {
  username: string;
  newPassword: string;
  confirmPassword: string;
}

interface LocationSettings {
  isActive: boolean;
  latitude: number | string;
  longitude: number | string;
  radius: number | string;
}

interface Errors {
  [key: string]: string;
}

interface Props {
  initialLocationSettings: LocationSettings;
  token: string;
  admin: {
    id: string;
    username: string;
  };
}

export const Setting = ({ initialLocationSettings, token, admin }: Props) => {
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    username: admin.username,
    newPassword: "",
    confirmPassword: "",
  });

  const [locationSettings, setLocationSettings] = useState<LocationSettings>({
    isActive: initialLocationSettings.isActive,
    latitude: initialLocationSettings.latitude,
    longitude: initialLocationSettings.longitude,
    radius: initialLocationSettings.radius,
  });

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"admin" | "location">("admin");
  const [errors, setErrors] = useState<Errors>({});

  const validateAdminForm = (): Errors => {
    const newErrors: Errors = {};

    if (!adminSettings.username.trim()) {
      newErrors.username = "Username tidak boleh kosong";
    } else if (adminSettings.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }

    if (adminSettings.newPassword && adminSettings.newPassword.length < 6) {
      newErrors.newPassword = "Password minimal 6 karakter";
    }

    if (adminSettings.newPassword !== adminSettings.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak sesuai";
    }

    return newErrors;
  };

  const validateLocationForm = (): Errors => {
    const newErrors: Errors = {};

    if (locationSettings.isActive) {
      if (
        !locationSettings.latitude ||
        isNaN(Number(locationSettings.latitude))
      ) {
        newErrors.latitude = "Latitude harus berupa angka";
      } else if (
        Number(locationSettings.latitude) < -90 ||
        Number(locationSettings.latitude) > 90
      ) {
        newErrors.latitude = "Latitude harus antara -90 sampai 90";
      }

      if (
        !locationSettings.longitude ||
        isNaN(Number(locationSettings.longitude))
      ) {
        newErrors.longitude = "Longitude harus berupa angka";
      } else if (
        Number(locationSettings.longitude) < -180 ||
        Number(locationSettings.longitude) > 180
      ) {
        newErrors.longitude = "Longitude harus antara -180 sampai 180";
      }

      if (!locationSettings.radius || Number(locationSettings.radius) < 50) {
        newErrors.radius = "Radius minimal 50 meter";
      }
    }

    return newErrors;
  };

  const handleAdminSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const formErrors = validateAdminForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...errors, ...formErrors });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await updateAdmin(
        token,
        adminSettings.username,
        adminSettings.newPassword
      );

      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message);

      Swal.fire({
        title: "Berhasil!",
        text: "Pengaturan admin berhasil disimpan",
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });
      customRevaldation("/admin/settings", "page");
      setAdminSettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
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

  const handleLocationSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const formErrors = validateLocationForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...errors, ...formErrors });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await updateLocationSettings(
        token,
        parseFloat(locationSettings.latitude as string),
        parseFloat(locationSettings.longitude as string),
        parseFloat(locationSettings.radius as string),
        locationSettings.isActive ? "ACTIVE" : "INACTIVE"
      );

      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message);

      Swal.fire({
        title: "Berhasil!",
        text: "Pengaturan lokasi berhasil disimpan",
        icon: "success",
        confirmButtonColor: "#6A67CE",
      });
      customRevaldation("/admin/settings", "page");
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

  const getCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation.");
      return;
    }

    const originalButton = document.activeElement as HTMLButtonElement;
    if (originalButton) {
      originalButton.disabled = true;
      originalButton.textContent = "Mendapatkan Lokasi...";
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Berhasil mendapatkan lokasi
        setLocationSettings((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setErrors((prev) => ({
          ...prev,
          latitude: "",
          longitude: "",
        }));

        Swal.fire({
          title: "Berhasil!",
          text: "Lokasi berhasil didapatkan",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: "#6A67CE",
        });

        if (originalButton) {
          originalButton.disabled = false;
          originalButton.innerHTML =
            '<svg class="w-4 h-4 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a4.98 4.98 0 01.332-1.973z" clip-rule="evenodd"></path></svg>Gunakan Lokasi Saat Ini';
        }
      },
      (error) => {
        let errorMessage = "Gagal mendapatkan lokasi. ";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage +=
              "Izin lokasi ditolak. Silakan berikan izin lokasi dan coba lagi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage += "Waktu permintaan lokasi habis. Coba lagi.";
            break;
          default:
            errorMessage += "Terjadi kesalahan yang tidak diketahui.";
            break;
        }

        Swal.fire({
          title: "Gagal Mendapatkan Lokasi",
          text: errorMessage,
          icon: "error",
          confirmButtonColor: "#6A67CE",
        });

        if (originalButton) {
          originalButton.disabled = false;
          originalButton.innerHTML =
            '<svg class="w-4 h-4 mr-2 inline-block" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6s-6-2.686-6-6a4.98 4.98 0 01.332-1.973z" clip-rule="evenodd"></path></svg>Gunakan Lokasi Saat Ini';
        }

        console.error("Geolocation error:", error);
      },
      options
    );
  };

  const handleLocationStatusChange = (isActive: boolean): void => {
    setLocationSettings((prev) => ({
      ...prev,
      isActive,
    }));

    if (!isActive) {
      setErrors((prev) => ({
        ...prev,
        latitude: "",
        longitude: "",
        radius: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3533A1] mb-2">
            Pengaturan
          </h1>
          <p className="text-gray-600">
            Kelola pengaturan admin dan lokasi bisnis Anda
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("admin")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "admin"
                    ? "border-[#6A67CE] text-[#6A67CE]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "admin" ? "page" : undefined}
              >
                <BiShield className="inline-block w-4 h-4 mr-2" />
                Admin
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "location"
                    ? "border-[#6A67CE] text-[#6A67CE]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === "location" ? "page" : undefined}
              >
                <BiMapPin className="inline-block w-4 h-4 mr-2" />
                Lokasi
              </button>
            </nav>
          </div>

          {activeTab === "admin" && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Pengaturan Admin
                </h2>
                <p className="text-gray-600">
                  Kelola kredensial dan keamanan admin
                </p>
              </div>

              <div className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Username Admin
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan username"
                    value={adminSettings.username}
                    onChange={(e) => {
                      setAdminSettings((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                      if (errors.username) {
                        setErrors((prev) => ({ ...prev, username: "" }));
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                      errors.username
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                    aria-describedby={
                      errors.username ? "username-error" : undefined
                    }
                  />
                  {errors.username && (
                    <p
                      id="username-error"
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Masukkan password baru"
                      value={adminSettings.newPassword}
                      onChange={(e) => {
                        setAdminSettings((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }));
                        if (errors.newPassword) {
                          setErrors((prev) => ({ ...prev, newPassword: "" }));
                        }
                      }}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                        errors.newPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      aria-describedby={
                        errors.newPassword ? "new-password-error" : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showNewPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {showNewPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <BsEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p
                      id="new-password-error"
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password baru"
                      value={adminSettings.confirmPassword}
                      onChange={(e) => {
                        setAdminSettings((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }));
                        if (errors.confirmPassword) {
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: "",
                          }));
                        }
                      }}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                        errors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirm-password-error"
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showConfirmPassword
                          ? "Sembunyikan password"
                          : "Tampilkan password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <BsEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p
                      id="confirm-password-error"
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAdminSubmit}
                    disabled={isSubmitting}
                    className="bg-[#6A67CE] hover:bg-[#3533A1] text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <BiSave className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Pengaturan Lokasi
                </h2>
                <p className="text-gray-600">
                  Atur lokasi bisnis dan radius layanan
                </p>
              </div>

              <div className="space-y-6">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Status Lokasi
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="locationStatus"
                        value="true"
                        checked={locationSettings.isActive === true}
                        onChange={() => handleLocationStatusChange(true)}
                        className="w-4 h-4 text-[#6A67CE] border-gray-300 focus:ring-[#6A67CE] focus:ring-2"
                      />
                      <span className="ml-2 text-gray-700">Aktif</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="locationStatus"
                        value="false"
                        checked={locationSettings.isActive === false}
                        onChange={() => handleLocationStatusChange(false)}
                        className="w-4 h-4 text-[#6A67CE] border-gray-300 focus:ring-[#6A67CE] focus:ring-2"
                      />
                      <span className="ml-2 text-gray-700">Tidak Aktif</span>
                    </label>
                  </div>
                </div>

                {locationSettings.isActive && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Latitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Contoh: -6.2088"
                          value={locationSettings.latitude}
                          onChange={(e) => {
                            setLocationSettings((prev) => ({
                              ...prev,
                              latitude: parseFloat(e.target.value) || "",
                            }));
                            if (errors.latitude) {
                              setErrors((prev) => ({ ...prev, latitude: "" }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                            errors.latitude
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          required
                          aria-describedby={
                            errors.latitude ? "latitude-error" : undefined
                          }
                        />
                        {errors.latitude && (
                          <p
                            id="latitude-error"
                            className="text-red-600 text-sm mt-1"
                          >
                            {errors.latitude}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Longitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Contoh: 106.8456"
                          value={locationSettings.longitude}
                          onChange={(e) => {
                            setLocationSettings((prev) => ({
                              ...prev,
                              longitude: parseFloat(e.target.value) || "",
                            }));
                            if (errors.longitude) {
                              setErrors((prev) => ({ ...prev, longitude: "" }));
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                            errors.longitude
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          required
                          aria-describedby={
                            errors.longitude ? "longitude-error" : undefined
                          }
                        />
                        {errors.longitude && (
                          <p
                            id="longitude-error"
                            className="text-red-600 text-sm mt-1"
                          >
                            {errors.longitude}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all flex items-center"
                      >
                        <BiGlobe className="w-4 h-4 mr-2" />
                        Gunakan Lokasi Saat Ini
                      </button>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Radius Layanan (meter)
                      </label>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        placeholder="Contoh: 5000"
                        value={locationSettings.radius}
                        onChange={(e) => {
                          setLocationSettings((prev) => ({
                            ...prev,
                            radius: parseInt(e.target.value) || "",
                          }));
                          if (errors.radius) {
                            setErrors((prev) => ({ ...prev, radius: "" }));
                          }
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A67CE] transition-colors ${
                          errors.radius
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        required
                        aria-describedby={
                          errors.radius ? "radius-error" : undefined
                        }
                      />
                      {errors.radius && (
                        <p
                          id="radius-error"
                          className="text-red-600 text-sm mt-1"
                        >
                          {errors.radius}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm mt-1">
                        Jarak maksimal dari lokasi bisnis untuk layanan delivery
                      </p>
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleLocationSubmit}
                    disabled={isSubmitting}
                    className="bg-[#6A67CE] hover:bg-[#3533A1] text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <BiSave className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
