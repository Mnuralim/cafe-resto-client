import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface Props {
  currentSortMenu?: string;
  categories: ICategory[];
}

export const FilterControll = ({ currentSortMenu, categories }: Props) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { value: "name", label: "Nama" },
    { value: "created_at", label: "Tanggal" },
    { value: "price", label: "Harga" },
  ];

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("search", e.target.value);
      replace(`/admin/menu?${newParams.toString()}`, {
        scroll: false,
      });
    },
    500
  );

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === "ALL") {
      newParams.delete("category");
    } else {
      newParams.set("category", e.target.value);
    }
    replace(`/admin/menu?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    replace(`/admin/menu?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortReport = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortMenu", currentSortMenu === "asc" ? "desc" : "asc");
    replace(`/admin/menu?${newParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="bg-neutral-50 border-4 border-neutral-700  rounded-none p-4">
        <div className="flex items-center mb-2">
          <BiSearch className="w-5 h-5 mr-2" />
          <h3 className="font-bold">Pencarian</h3>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cari menu..."
            className="w-full border-2 border-neutral-700 p-2 pl-10 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-neutral-50 border-4 border-neutral-700 rounded-none p-4 flex-1">
          <div className="flex items-center mb-2">
            <BiChevronDown className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Filter</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label className="text-sm font-medium mb-1 block">Kategori</label>
              <select
                onChange={handleFilterCategory}
                className="w-full appearance-none border-2 border-neutral-700 p-2 pr-10 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <BiChevronDown className="absolute right-3 top-[calc(50%+0.5rem)] transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 border-4 border-neutral-700 rounded-none p-4 flex-1 md:flex-initial ">
          <div className="flex items-center mb-2">
            {currentSortMenu === "asc" ? (
              <GoSortAsc className="w-5 h-5 mr-2" />
            ) : (
              <GoSortDesc className="w-5 h-5 mr-2" />
            )}
            <h3 className="font-bold">Urutkan</h3>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select
                onChange={handleSortBy}
                className="w-full appearance-none border-2 border-neutral-700 p-2 pr-10 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>
            <button
              onClick={handleSortReport}
              className="bg-neutral-200 border-2 border-neutral-700 p-2 rounded-none hover:bg-neutral-300 transition-colors"
            >
              {currentSortMenu === "asc" ? (
                <GoSortAsc className="w-5 h-5" />
              ) : (
                <GoSortDesc className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
