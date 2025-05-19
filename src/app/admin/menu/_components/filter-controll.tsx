import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { BiChevronDown, BiSearch, BiFilterAlt } from "react-icons/bi";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface Props {
  currentSortMenu?: string;
  categories: ICategory[];
  menuCount: number;
}

export const FilterControll = ({
  currentSortMenu,
  categories,
  menuCount,
}: Props) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
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
      newParams.delete("page");
      if (e.target.value === "") {
        newParams.delete("search");
        newParams.delete("limit");
      } else {
        newParams.set("limit", menuCount.toString());
      }
      replace(`/admin/menu?${newParams.toString()}`, { scroll: false });
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

    replace(`/admin/menu?${newParams.toString()}`, { scroll: false });
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    replace(`/admin/menu?${newParams.toString()}`, { scroll: false });
  };

  const handleSortReport = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortMenu", currentSortMenu === "asc" ? "desc" : "asc");
    replace(`/admin/menu?${newParams.toString()}`, { scroll: false });
  };

  const toggleFilters = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <div className="mb-4">
      {/* Main Compact Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cari menu..."
            className="w-full border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Toggle Filter Button */}
        <button
          onClick={toggleFilters}
          className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <BiFilterAlt className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium">Filter</span>
          <BiChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isFilterExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Always visible sort controls */}
        <div className="flex items-center">
          <div className="relative mr-1">
            <select
              onChange={handleSortBy}
              className="border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white shadow-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={handleSortReport}
            className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-sm"
            aria-label="Toggle sort direction"
          >
            {currentSortMenu === "asc" ? (
              <GoSortAsc className="w-4 h-4 text-amber-600" />
            ) : (
              <GoSortDesc className="w-4 h-4 text-amber-600" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Filter Section */}
      {isFilterExpanded && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 transition-all">
          <div className="flex items-center mb-2">
            <BiChevronDown className="w-4 h-4 text-purple-600 mr-1" />
            <h3 className="text-sm font-medium text-gray-700">Kategori</h3>
          </div>
          <div className="relative">
            <select
              onChange={handleFilterCategory}
              className="w-full border border-gray-200 rounded-lg py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="ALL">Semua Kategori</option>
              {categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};
