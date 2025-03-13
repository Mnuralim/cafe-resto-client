import Link from "next/link";
import React from "react";
interface Props {
  id: number;
}

export default function Button({ id }: Props) {
  return (
    <Link
      href={`/pelanggan/menu/${id}`}
      className="bg-[#3533A1] text-white px-4 py-2 rounded-lg"
    >
      Tambah
    </Link>
  );
}
