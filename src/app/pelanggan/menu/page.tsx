"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "./_components/button";
import BottomNavigation from "../bottomnav/bottomnav";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Definisikan tipe untuk kategori
type Category = "semua" | "makanan" | "minuman" | "seafood" | "kertas-menu";

// Definisikan tipe untuk item menu
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("semua");
  const swiperRef = useRef<any>(null); // Ref untuk mengontrol swiper

  // Data menu (contoh)
  const menuData: Record<Category, MenuItem[]> = {
    semua: [
      {
        id: 1,
        name: "Ayam",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/ayam1.jpeg",
        description: "Paling enak",
      },
      {
        id: 2,
        name: "Cumi",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/cumi1.jpeg",
        description: "Paling enak",
      },
      {
        id: 3,
        name: "Kopi",
        category: "Minuman",
        price: "Rp20.000",
        image: "/assets/menu/minuman/minuman1.jpeg",
        description: "Mantap",
      },
      {
        id: 4,
        name: "Siput",
        category: "Minuman",
        price: "Rp20.000",
        image: "/assets/menu/makanan/siput1.jpeg",
        description: "Mantap",
      },
    ],
    makanan: [
      {
        id: 1,
        name: "Ikan",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/ikan1.jpeg",
        description: "Paling enak",
      },
      {
        id: 2,
        name: "Mie",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/mie1.jpeg",
        description: "Enak & Gurih",
      },
      {
        id: 3,
        name: "Udang",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/udang4.jpeg",
        description: "Enak & Gurih",
      },
    ],
    minuman: [
      {
        id: 1,
        name: "Kopi",
        category: "minuman",
        price: "Rp20.000",
        image: "/assets/menu/minuman/minuman2.jpeg",
        description: "Paling enak",
      },
      {
        id: 2,
        name: "Kopi",
        category: "minuman",
        price: "Rp20.000",
        image: "/assets/menu/minuman/minuman3.jpeg",
        description: "Paling enak",
      },
      {
        id: 3,
        name: "Kopi",
        category: "minuman",
        price: "Rp20.000",
        image: "/assets/menu/minuman/minuman4.jpeg",
        description: "Paling enak",
      },
    ],
    seafood: [
      {
        id: 1,
        name: "Kerang",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/kerang1.jpeg",
        description: "Paling enak",
      },
      {
        id: 2,
        name: "Ikan",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/ikan3.jpeg",
        description: "Paling enak",
      },
      {
        id: 3,
        name: "Siput",
        category: "makanan",
        price: "Rp20.000",
        image: "/assets/menu/makanan/siput1.jpeg",
        description: "Paling enak",
      },
    ],
    "kertas-menu": [], // Tidak ada item, hanya gambar swiper
  };

  // Data gambar untuk kertas menu beserta keterangan
  const kertasMenuImages = [
    {
      image: "/assets/menu/makanan.jpeg",
      description: "Menu Makanan",
    },
    {
      image: "/assets/menu/minuman.jpeg",
      description: "Menu Minuman",
    },
    {
      image: "/assets/menu/seafood.jpeg",
      description: "Menu Seafood",
    },
  ];

  // Fungsi untuk mengubah kategori
  const handleCategoryChange = (category: Category, index: number) => {
    setActiveCategory(category);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Geser swiper ke slide yang sesuai
    }
  };

  // Fungsi untuk menangani perubahan slide swiper
  const handleSlideChange = (swiper: any) => {
    const categories: Category[] = [
      "semua",
      "makanan",
      "minuman",
      "seafood",
      "kertas-menu",
    ];
    setActiveCategory(categories[swiper.activeIndex]); // Set kategori aktif berdasarkan slide
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {" "}
      {/* Tambahkan padding-bottom untuk menghindari bottom navigation */}
      {/* Header */}
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-2xl text-center font-bold text-gray-800">Menu</h1>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Cari menu"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>
      {/* Filter Kategori */}
      <div className="flex space-x-4 p-4 bg-white overflow-x-auto">
        {["semua", "makanan", "minuman", "seafood", "kertas-menu"].map(
          (category, index) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as Category, index)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-[#3533A1] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category === "kertas-menu" ? "Kertas Menu" : category}
            </button>
          )
        )}
      </div>
      {/* Swiper untuk Kategori Menu */}
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {/* Slide Semua */}
        <SwiperSlide>
          <div className="p-4">
            {menuData["semua"].map((item: MenuItem) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800 font-bold">{item.price}</p>
                  </div>
                  <Button id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>

        {/* Slide Makanan */}
        <SwiperSlide>
          <div className="p-4">
            {menuData["makanan"].map((item: MenuItem) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800 font-bold">{item.price}</p>
                  </div>
                  <Button id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>

        {/* Slide Minuman */}
        <SwiperSlide>
          <div className="p-4">
            {menuData["minuman"].map((item: MenuItem) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800 font-bold">{item.price}</p>
                  </div>
                  <Button id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>

        {/* Slide Seafood */}
        <SwiperSlide>
          <div className="p-4">
            {menuData["seafood"].map((item: MenuItem) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-800 font-bold">{item.price}</p>
                  </div>
                  <Button id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>

        {/* Slide Kertas Menu */}
        <SwiperSlide>
          <div className="p-4">
            <Swiper
              slidesPerView={1} // Tampilkan satu gambar per slide
              spaceBetween={10}
              className="w-full h-full"
            >
              {kertasMenuImages.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-[500px] relative">
                      <Image
                        src={item.image}
                        alt={`Kertas Menu ${index + 1}`}
                        fill // Gunakan fill untuk mengisi container
                        className="object-contain rounded-lg" // Pastikan gambar tidak terpotong
                      />
                    </div>
                    <p className="mt-4 text-lg font-bold text-gray-800">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default MenuPage;
