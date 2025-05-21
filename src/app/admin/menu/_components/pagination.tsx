import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  meta: MenuMeta;
  currentLimit?: string;
}

export const Pagination = ({ meta, currentLimit }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", newLimit);
    newParams.set("page", "1");
    replace(`/admin/menu?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", `${page}`);
    replace(`/admin/menu?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const getPageNumbers = () => {
    const totalPages = meta.totalPages;
    const currentPage = meta.currentPage;
    const pageNumbers = [];

    pageNumbers.push(1);
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <select
          value={currentLimit || 10}
          onChange={handleLimitChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#3533A1] focus:border-transparent"
        >
          {[5, 10, 25, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>items per page</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(meta.currentPage - 1)}
            disabled={!meta.hasPrevPage}
            className={`flex items-center justify-center px-3 py-2 rounded-l-md border ${
              !meta.hasPrevPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            aria-label="Previous page"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {pageNumbers.map((page, idx) => (
            <React.Fragment key={idx}>
              {page === "..." ? (
                <span className="px-3 py-2 border-t border-b text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => handlePageChange(Number(page))}
                  className={`px-3 py-2 border-t border-b text-sm font-medium ${
                    page === meta.currentPage
                      ? "bg-[#3533A1] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => handlePageChange(meta.currentPage + 1)}
            disabled={!meta.hasNextPage}
            className={`flex items-center justify-center px-3 py-2 rounded-r-md border ${
              !meta.hasNextPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            aria-label="Next page"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Showing {(meta.currentPage - 1) * meta.itemsPerPage + 1} to{" "}
        {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalMenus)} of{" "}
        {meta.totalMenus} entries
      </div>
    </div>
  );
};
