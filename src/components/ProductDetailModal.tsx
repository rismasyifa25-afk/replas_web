import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailModalProps {
  product: {
    id: string;
    orderer: string;
    product: string;
    quantity: number;
    price: string;
    status: string;
  };
  children: React.ReactNode;
}

export default function ProductDetailModal({ product, children }: ProductDetailModalProps) {
  const statusMap: Record<string, { variant: "green" | "yellow" | "red"; label: string }> = {
    success: { variant: "green", label: "Selesai" },
    pending: { variant: "yellow", label: "Menunggu" },
    failed: { variant: "red", label: "Gagal" },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Pemesanan Produk</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang pemesanan produk ini.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="id" className="text-right">
              ID:
            </label>
            <span id="id" className="col-span-3">
              {product.id}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="orderer" className="text-right">
              Nama Pemesan:
            </label>
            <span id="orderer" className="col-span-3">
              {product.orderer}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="product" className="text-right">
              Produk:
            </label>
            <span id="product" className="col-span-3">
              {product.product}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="quantity" className="text-right">
              Jumlah:
            </label>
            <span id="quantity" className="col-span-3">
              {product.quantity}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right">
              Harga:
            </label>
            <span id="price" className="col-span-3">
              {product.price}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right">
              Status:
            </label>
            <Badge
              variant={statusMap[product.status]?.variant === "green" ? "default" : statusMap[product.status]?.variant === "yellow" ? "secondary" : "destructive"}
              className="col-span-3"
            >
              {statusMap[product.status]?.label || "Gagal"}
            </Badge>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline">
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
