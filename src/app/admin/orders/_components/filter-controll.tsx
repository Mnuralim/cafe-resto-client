import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { BiCalendar, BiChevronDown, BiSearch } from "react-icons/bi";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface FilterControlProps {
  currentSortOrder?: string;
  orderCount: number;
}

export const FilterControll = ({
  currentSortOrder,
  orderCount,
}: FilterControlProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { value: "created_at", label: "Waktu" },
    { value: "customer_name", label: "Pemesan" },
    { value: "total_price", label: "Total Harga" },
  ];

  const statusOptions = [
    { value: "ALL", label: "Semua Status" },
    { value: "PENDING", label: "Diterima" },
    { value: "PROCESSING", label: "Diproses" },
    { value: "COMPLETED", label: "Selesai" },
    { value: "CANCELLED", label: "Dibatalkan" },
  ];

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page");

      newParams.set("search", e.target.value);
      if (e.target.value === "") {
        newParams.delete("limit");
        newParams.delete("search");
      } else {
        newParams.set("limit", orderCount.toString());
      }
      replace(`/admin/orders?${newParams.toString()}`, {
        scroll: false,
      });
    },
    500
  );
  const handleFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value === "ALL") {
      newParams.delete("status");
    } else {
      newParams.set("status", e.target.value);
    }
    replace(`/admin/orders?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    replace(`/admin/orders?${newParams.toString()}`, { scroll: false });
  };

  const handleSortOrder = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortOrder", currentSortOrder === "asc" ? "desc" : "asc");
    replace(`/admin/orders?${newParams.toString()}`, { scroll: false });
  };

  const handleDateFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("startDate", startDate);
    newParams.set("endDate", endDate);
    replace(`/admin/orders?${newParams.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("startDate");
    newParams.delete("endDate");
    replace(`/admin/orders?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4">
      {/* Main Search Bar and Filters Toggle */}
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cari pesanan..."
            className="w-full border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-1">
          <div className="relative">
            <select
              onChange={handleFilterStatus}
              className="border border-gray-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white shadow-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-1">
            <div className="relative">
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
              onClick={handleSortOrder}
              className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-sm"
              aria-label="Toggle sort direction"
            >
              {currentSortOrder === "asc" ? (
                <GoSortAsc className="w-4 h-4 text-gray-600" />
              ) : (
                <GoSortDesc className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors flex items-center gap-1 shadow-sm"
          >
            <BiCalendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Tanggal</span>
            <BiChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Date Filter Section - Collapsible */}
      {isFiltersOpen && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mt-2 flex flex-wrap items-end gap-3">
          <div className="flex-grow min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Dari Tanggal
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex-grow min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Sampai Tanggal
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDateFilter}
              className="bg-[#3533A1] hover:bg-indigo-700 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              Terapkan
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-sm transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
