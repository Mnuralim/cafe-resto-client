"use client";
import React, { useRef } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import PrintableReport from "./pdf-report";

interface Props {
  data: ISalesReport[];
}

export const ListReports = ({ data }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Laporan-Penjualan",
  });
  // const renderOrderCard = (order: ISalesReport) => (
  //   <div key={order.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
  //     <div className="flex justify-between items-center mb-3">
  //       <span className="font-semibold text-sm text-gray-600">
  //         ID: {order.id}
  //       </span>
  //     </div>

  //     <h3 className="font-bold text-lg mb-2">{order.customer_name}</h3>

  //     <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
  //       <div>
  //         <p className="text-gray-500">Meja</p>
  //         <p className="font-medium">Meja {order.table.number}</p>
  //       </div>
  //       <div>
  //         <p className="text-gray-500">Total</p>
  //         <p className="font-medium">{formatCurrency(order.total_price)}</p>
  //       </div>
  //       <div>
  //         <p className="text-gray-500">Waktu</p>
  //         <p className="font-medium">{formatDate(order.created_at)}</p>
  //       </div>
  //       <div>
  //         <p className="text-gray-500">Jumlah Item</p>
  //         <p className="font-medium">{order.orderItems.length} item</p>
  //       </div>
  //     </div>

  //     <Link
  //       href={`/admin/orders/${order.id}`}
  //       className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center w-full"
  //     >
  //       <FaEye className="mr-2" />
  //       Lihat Detail
  //     </Link>
  //   </div>
  // );

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
