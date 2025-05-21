"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import "swiper/css";
import Button from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("search", e.target.value);
      replace(`/menu?${newParams.toString()}`);
    },
    500
  );

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    newParams.delete("category");
    replace(`/menu?${newParams.toString()}`);
  };

  const categoriesWithAll = [{ id: "semua", name: "Semua" }, ...categories];

  return (
    <>
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-2xl text-center font-bold text-gray-800">Menu</h1>
        <div className="mt-4 relative">
          <input
            onChange={handleSearch}
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
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
            {dataMenu.data.length > 0 ? (
              dataMenu.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100 hover:border-gray-200"
                >
                  {/* Image container */}
                  <div className="relative w-full pb-[75%]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      quality={90}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Card content */}
                  <div className="p-0 flex flex-col flex-grow">
                    <div className="px-3 pt-3">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
                        {item.name}
                      </h3>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                          {item.category?.name || "Menu"}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {item.status ? "Tersedia" : "Kosong"}
                        </span>
                      </div>

                      <p className="text-[15px] font-semibold text-gray-700 mb-3">
                        Rp{new Intl.NumberFormat("id-ID").format(item.price)}
                      </p>
                    </div>

                    {/* Button with squared top corners */}
                    <Button
                      id={item.id}
                      name={item.name}
                      category={item.category}
                      image={item.image}
                      price={item.price}
                      disabled={!item.status}
                      className={`
        w-full py-3 mt-auto
        rounded-none rounded-b-xl 
        border-t border-gray-200
        ${
          !item.status
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-inner"
        }
        transition-all duration-200
      `}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-500 mb-2">
                  Tidak ada menu yang sesuai dengan pencarian
                </div>
                <button
                  onClick={handleReset}
                  className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  Reset pencarian
                </button>
              </div>
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
