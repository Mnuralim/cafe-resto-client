import { useCartStore } from "@/store/cart";
import React from "react";
interface Props {
  id: string;
  name: string;
  image: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
}

export default function Button({ id, name, image, price, category }: Props) {
  const { items, addItem } = useCartStore();

  const isInCart = items.some((item) => item.id === id);
  const itemInCart = items.find((item) => item.id === id);

  const handleAddToCart = () => {
    addItem({ id, name, image, price, category });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`px-4 py-2 rounded-lg transition-all ${
        isInCart ? "bg-green-500 text-white" : "bg-[#3533A1] text-white"
      }`}
    >
      {isInCart ? `Di Keranjang (${itemInCart?.quantity})` : "Tambah"}
    </button>
  );
}
