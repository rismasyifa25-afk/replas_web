"use client";

import { useState } from "react";
import StatusButton from "@/components/element/Button/Status";
import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const InputTable = [
  {
    no: 1,
    namaBarang: "Buku Tulis",
    noResi: "0081234567891011",
    harga: "Rp100.000",
    status: "success",
  },
  {
    no: 2,
    namaBarang: "Pensil",
    noResi: "0081234567891012",
    harga: "Rp50.000",
    status: "pending",
  },
  {
    no: 3,
    namaBarang: "Penghapus",
    noResi: "0081234567891013",
    harga: "Rp10.000",
    status: "gagal",
  },
  {
    no: 4,
    namaBarang: "Penggaris",
    noResi: "0081234567891014",
    harga: "Rp7.000",
    status: "success",
  },
  {
    no: 5,
    namaBarang: "Spidol",
    noResi: "0081234567891015",
    harga: "Rp12.000",
    status: "pending",
  },
  {
    no: 6,
    namaBarang: "Kuas",
    noResi: "0081234567891016",
    harga: "Rp15.000",
    status: "gagal",
  },
  {
    no: 7,
    namaBarang: "Crayon",
    noResi: "0081234567891017",
    harga: "Rp30.000",
    status: "success",
  },
  {
    no: 8,
    namaBarang: "Cat Air",
    noResi: "0081234567891018",
    harga: "Rp45.000",
    status: "pending",
  },
  {
    no: 9,
    namaBarang: "Tali",
    noResi: "0081234567891019",
    harga: "Rp5.000",
    status: "gagal",
  },
  {
    no: 10,
    namaBarang: "Benang",
    noResi: "0081234567891020",
    harga: "Rp3.000",
    status: "success",
  },
  {
    no: 11,
    namaBarang: "Benang",
    noResi: "0081234567891020",
    harga: "Rp3.000",
    status: "success",
  },
];

function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(InputTable.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InputTable.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Map status string to color and label
  const statusMap: Record<
    string,
    { variant: "green" | "yellow" | "red"; label: string }
  > = {
    success: { variant: "green", label: "Dibayar" },
    pending: { variant: "yellow", label: "Menunggu" },
    gagal: { variant: "red", label: "Gagal" },
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-fit flex flex-col items-center px-4">
        <div className="border rounded w-full h-fit overflow-x-auto font-bold mb-8 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Id Barang</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.noResi} className="even:bg-muted/50">
                  <TableCell className="font-medium">{item.no}</TableCell>
                  <TableCell>{item.namaBarang}</TableCell>
                  <TableCell>{item.noResi}</TableCell>
                  <TableCell>{item.harga}</TableCell>
                  <TableCell>
                    <StatusButton
                      variant={statusMap[item.status]?.variant || "red"}
                    >
                      {statusMap[item.status]?.label || "Gagal"}
                    </StatusButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 ? (
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              ) : (
                <span className="px-3 py-1 text-gray-400 cursor-not-allowed">
                  Prev
                </span>
              )}
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currentPage < totalPages ? (
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              ) : (
                <span className="px-3 py-1 text-gray-400 cursor-not-allowed">
                  Next
                </span>
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </>
  );
}

export default HistoryPage;
