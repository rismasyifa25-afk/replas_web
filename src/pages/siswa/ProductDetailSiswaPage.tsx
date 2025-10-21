import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";
import FooterLayouts from "@/components/layouts/FooterSiswa";
import { Fetch } from "@/lib/fetch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Counter from "@/components/element/Counter";

export default function ProductDetailSiswaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [showInsufficientPoints, setShowInsufficientPoints] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchUserPoints();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await Fetch.get(`/products/${id}`);
      setProduct(response.data);
    } catch {
      // fallback
      setProduct({
        id,
        name: "LKS",
        price: 14000,
        stock: 250,
        description: "Deskripsi produk fallback",
        image: "/images/product.jpeg",
      });
    }
  };

  const fetchUserPoints = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;
      const response = await Fetch.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
      setUserPoints(response.data.points || 0);
    } catch {
      setUserPoints(0);
    }
  };

  const subtotal = product?.price * quantity;

  const handlePurchase = async () => {
    if (userPoints < subtotal) {
      setShowInsufficientPoints(true);
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      const response = await Fetch.post(
        "/orders/purchase",
        { productId: id, quantity, pointsUsed: subtotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/siswa/receipt", {
        state: {
          order: {
            productName: product.name,
            quantity,
            price: product.price,
            pointsUsed: subtotal,
            date: new Date().toISOString(),
            resiNumber: response.data.resiNumber || "AUTO-GENERATED",
          },
        },
      });
    } catch {
      alert("Pembelian gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <SiswaNavbar />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center px-4 sm:px-8 md:px-16 py-10 text-black dark:text-white">
        {/* Gambar Produk */}
        <div className="flex justify-center lg:justify-start">
          <img src={product.image} alt={product.name} className="w-48 sm:w-60 md:w-72 rounded-2xl object-cover" />
        </div>

        {/* Deskripsi Produk */}
        <div className="flex flex-col w-full max-w-md">
          <p className="text-3xl sm:text-4xl font-bold">{product.name}</p>
          <p className="text-sm sm:text-base mt-1">Stok: {product.stock}</p>
          <p className="my-4 text-3xl sm:text-5xl font-bold text-[#CD242C]">Rp {product.price.toLocaleString()}</p>
          <p className="font-bold mb-2">Deskripsi :</p>
          <p className="text-sm sm:text-base leading-relaxed">{product.description}</p>
          <button onClick={() => navigate("/siswa/store")} className="mt-4 text-blue-400 underline">Kembali ke Store</button>
        </div>

        {/* Box Pesanan */}
        <div className="flex flex-col p-4 gap-4 border border-red-500 rounded-md w-full sm:w-80 bg-transparent text-black dark:text-white lg:sticky lg:top-10">
          <h2 className="text-lg font-semibold text-center lg:text-left">Buat pesanan anda</h2>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <img src={product.image} width={48} height={48} alt={product.name} className="w-12 h-12 object-cover rounded-sm" />
            <p className="font-semibold">{product.name}</p>
          </div>
          <hr className="border-gray-600" />
          <div className="flex items-center justify-between">
            <Counter quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div className="flex justify-between items-center">
            <span>Subtotal :</span>
            <span className="text-red-500 text-xl font-semibold">Rp {subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Poin Anda :</span>
            <span className="text-green-500 text-xl font-semibold">{userPoints}</span>
          </div>
          <button onClick={handlePurchase} disabled={loading} className="w-full bg-red-500 py-2 rounded-md text-white font-semibold transition disabled:opacity-50">
            {loading ? "Memproses..." : "Beli Sekarang"}
          </button>
        </div>
      </div>

      <FooterLayouts />

      {/* Dialog Poin Kurang */}
      <Dialog open={showInsufficientPoints} onOpenChange={setShowInsufficientPoints}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Poin Tidak Cukup</DialogTitle>
            <DialogDescription>
              Poin Anda tidak cukup untuk melakukan pembelian ini. Silakan kumpulkan lebih banyak poin.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
