import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

interface Props {
  currentSortReport?: string;
}

export const FilterControl = ({ currentSortReport }: Props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateExpanded, setIsDateExpanded] = useState(false);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { value: "date", label: "Tanggal" },
    { value: "income", label: "Pendapatan" },
  ];

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    replace(`/admin/report?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleSortReport = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortReport", currentSortReport === "asc" ? "desc" : "asc");
    replace(`/admin/report?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleDateFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("startDate", startDate);
    newParams.set("endDate", endDate);
    replace(`/admin/report?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("startDate");
    newParams.delete("endDate");
    replace(`/admin/report?${newParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-4">
      {/* Main Controls Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Toggle Button */}
        <button
          onClick={() => setIsDateExpanded(!isDateExpanded)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg py-2 px-3 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <BiCalendar className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium">Rentang Tanggal</span>
          <BiChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDateExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sort Controls - Always Visible */}
        <div className="flex items-center gap-2">
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
            onClick={handleSortReport}
            className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-sm"
            aria-label="Toggle sort direction"
          >
            {currentSortReport === "asc" ? (
              <GoSortAsc className="w-4 h-4 text-indigo-600" />
            ) : (
              <GoSortDesc className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Date Filter */}
      {isDateExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow-sm border border-gray-200 p-3 transition-all">
          <div className="flex flex-wrap items-end gap-3">
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
                className="bg-[#6A67CE] hover:bg-indigo-700 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors"
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
        </div>
      )}
    </div>
  );
};
