import React, { useState, useEffect } from "react";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";
import FooterLayouts from "@/components/layouts/FooterSiswa";
import SearchBar from "@/components/fragments/SearchBar";
import SiswaProductSection from "@/components/fragments/SiswaProductSection";

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
}

const API_BASE = "http://localhost:8080/api/v1";

export default function StoreSiswa() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products?page=1&limit=100`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.data || data.products || []);
    } catch {
      // fallback data
      setProducts([
        { id: "1", name: "Emblem", description: "Deskripsi Emblem", stock: 10, price: 17000, image: "/images/product.jpeg" },
        { id: "2", name: "Badge", description: "Deskripsi Badge", stock: 5, price: 4000, image: "/images/product.jpeg" },
        { id: "3", name: "Topi", description: "Deskripsi Topi", stock: 20, price: 20000, image: "/images/product.jpeg" },
        { id: "4", name: "Soal Matematika", description: "Deskripsi Soal", stock: 15, price: 16000, image: "/images/product.jpeg" },
        { id: "5", name: "LKS Agama", description: "Deskripsi LKS", stock: 8, price: 22000, image: "/images/product.jpeg" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formattedProducts = products.map((p) => ({
    id: p.id,
    image: p.image || "/images/product.jpeg",
    title: p.name,
    price: `Rp ${p.price.toLocaleString()}`,
    link: `/siswa/product/${p.id}`, // pastikan link ke siswa product
  }));

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SiswaNavbar />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="z-50 mt-[-50px]">
            <SearchBar placeholder="Search..." />
          </div>
          <SiswaProductSection title="Produk" products={formattedProducts} />
        </div>
        <FooterLayouts />
      </div>
    </>
  );
}
