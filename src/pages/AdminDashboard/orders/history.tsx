import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusButton from "@/components/element/Button/Status";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const historyData = [
  {
    id: "001",
    room: "Room 1",
    points: 50,
    bottles: 5,
    date: "2024-10-01",
    status: "success",
  },
  {
    id: "002",
    room: "Room 2",
    points: 30,
    bottles: 3,
    date: "2024-10-02",
    status: "success",
  },
  {
    id: "003",
    room: "Room 3",
    points: 75,
    bottles: 7,
    date: "2024-10-03",
    status: "pending",
  },
  {
    id: "004",
    room: "Room 1",
    points: 40,
    bottles: 4,
    date: "2024-10-04",
    status: "success",
  },
  {
    id: "005",
    room: "Room 2",
    points: 60,
    bottles: 6,
    date: "2024-10-05",
    status: "failed",
  },
  // Add more data as needed
];

const statusMap: Record<string, { variant: "green" | "yellow" | "red"; label: string }> = {
  success: { variant: "green", label: "Berhasil" },
  pending: { variant: "yellow", label: "Menunggu" },
  failed: { variant: "red", label: "Gagal" },
};

export default function AdminOrdersHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">History Konversi Poin</h1>
      <div className="border rounded-xl w-full h-fit overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Poin</TableHead>
              <TableHead>Jumlah Botol</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.room}</TableCell>
                <TableCell>{item.points}</TableCell>
                <TableCell>{item.bottles}</TableCell>
                <TableCell>{item.date}</TableCell>
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
  );
}
