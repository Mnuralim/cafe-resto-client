"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./_components/button";

export default function BerandaPage() {
  const router = useRouter();

  const handleMulaiPesan = () => {
    router.push("menu");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
      <div className="bg-[#3533A1] p-8  w-full text-center flex flex-col items-center justify-between  h-full">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/assets/beranda/topping.png"
            alt="Topping"
            width={200}
            height={200}
            className="mx-auto"
            priority
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Hai, selamat datang
          </h1>
          <h2 className="text-2xl text-white mb-6">di Kafe Coffee & Resto</h2>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Button onClick={handleMulaiPesan} />{" "}
        </div>
      </div>
    </div>
  );
}
