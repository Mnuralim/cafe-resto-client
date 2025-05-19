"use client";
import React, { useRef } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import PrintableReport from "./pdf-report";
import { FilterControl } from "./filter-controll";

interface Props {
  data: ISalesReport[];
  currentSortReport?: string;
}

export const ListReports = ({ data, currentSortReport }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Laporan-Penjualan",
  });

  return (
    <div className="flex-1 w-full">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#3533A1]">
            Data Orders
          </h1>
          <button
            onClick={handlePrint}
            className="bg-[#3533A1] text-white px-4 py-2 rounded-lg hover:bg-[#6A67CE] flex items-center"
          >
            Cetak Laporan
          </button>
        </div>
        <div style={{ display: "none" }}>
          <PrintableReport ref={printRef} reports={data} />
        </div>

        <FilterControl currentSortReport={currentSortReport} />

        {/* <div className="md:hidden space-y-4">{data.map(renderOrderCard)}</div> */}

        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#3533A1] text-white">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left">No</th>
                  <th className="px-4 md:px-6 py-3 text-left">Tanggal</th>
                  <th className="px-4 md:px-6 py-3 text-left">
                    Total Transaksi
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left">Menu Terjual</th>
                  <th className="px-4 md:px-6 py-3 text-left">Pendapatan</th>
                  <th className="px-4 md:px-6 py-3 text-left">Kasir</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report, index) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-4 md:px-6 py-4">
                      {formatDate(report.date)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {report.orders.length}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {report.total_items_sold}
                    </td>

                    <td className="px-4 md:px-6 py-4">
                      {formatCurrency(report.income)}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {report.admin.username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {data.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              Belum ada pesanan yang masuk
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
