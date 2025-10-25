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
import ProductDetailModal from "@/components/ProductDetailModal";

const productOrderData = [
  {
    id: "001",
    orderer: "John Doe",
    product: "Nasi Goreng",
    quantity: 2,
    price: "Rp50.000",
    status: "success",
  },
  {
    id: "002",
    orderer: "Jane Smith",
    product: "Es Teh",
    quantity: 1,
    price: "Rp10.000",
    status: "pending",
  },
  {
    id: "003",
    orderer: "Bob Johnson",
    product: "Ayam Bakar",
    quantity: 3,
    price: "Rp75.000",
    status: "success",
  },
  {
    id: "004",
    orderer: "Alice Brown",
    product: "Jus Jeruk",
    quantity: 2,
    price: "Rp20.000",
    status: "failed",
  },
  {
    id: "005",
    orderer: "Charlie Wilson",
    product: "Bakso",
    quantity: 1,
    price: "Rp25.000",
    status: "pending",
  },
  // Add more data as needed
];

const statusMap: Record<string, { variant: "green" | "yellow" | "red"; label: string }> = {
  success: { variant: "green", label: "Selesai" },
  pending: { variant: "yellow", label: "Menunggu" },
  failed: { variant: "red", label: "Gagal" },
};

export default function AdminOrdersProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(productOrderData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productOrderData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Pemesanan Produk</h1>
      <div className="border rounded-xl w-full h-fit overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Pemesan</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <ProductDetailModal key={item.id} product={item}>
                <TableRow className="cursor-pointer hover:bg-muted/50">
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.orderer}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <StatusButton
                      variant={statusMap[item.status]?.variant || "red"}
                    >
                      {statusMap[item.status]?.label || "Gagal"}
                    </StatusButton>
                  </TableCell>
                </TableRow>
              </ProductDetailModal>
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
