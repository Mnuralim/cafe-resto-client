"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import "swiper/css";
import Button from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  dataMenu: MenuApiResponse;
  categories: ICategory[];
  activeCategory?: string;
}

export const MenuList = ({ categories, dataMenu, activeCategory }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "semua") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    replace(`/menu?${newParams.toString()}`);
  };

  const categoriesWithAll = [{ id: "semua", name: "Semua" }, ...categories];

  return (
    <>
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
      <div className="flex space-x-4 p-4 bg-white overflow-x-auto">
        {categoriesWithAll.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
              (activeCategory === undefined && category.id === "semua") ||
              activeCategory === category.id
                ? "bg-[#3533A1] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="p-4">
            {dataMenu.data.map((item) => (
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
                    <p className="text-gray-600">{"Mantap"}</p>
                    <p className="text-gray-800 font-bold">{item.price}</p>
                  </div>
                  <Button id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
