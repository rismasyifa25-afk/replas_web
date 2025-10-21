import ButtonKelas from "@/components/element/Button/Kelas";
import Counter from "@/components/element/Counter";
import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Fetch } from "@/lib/fetch";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [price] = useState<number>(14000);
  const [showInsufficientPoints, setShowInsufficientPoints] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserPoints();
  }, []);

  const fetchUserPoints = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;
      const response = await Fetch.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPoints(response.data.points || 0);
    } catch (error) {
      console.error("Failed to fetch user points:", error);
    }
  };

  const subtotal = price * quantity;

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
        {
          productId: id,
          quantity,
          pointsUsed: subtotal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/receipt", {
        state: {
          order: {
            productName: "LKS",
            quantity,
            price,
            pointsUsed: subtotal,
            date: new Date().toISOString(),
            resiNumber: response.data.resiNumber || "AUTO-GENERATED",
          },
        },
      });
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Pembelian gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-10 justify-center px-4 sm:px-8 md:px-16 py-10 text-black dark:text-white">
        {/* Gambar Produk */}
        <div className="flex justify-center lg:justify-start">
          <img
            src="../images/product.jpeg"
            alt="LKS"
            className="w-48 sm:w-60 md:w-72 rounded-2xl object-cover"
          />
        </div>

        {/* Deskripsi Produk */}
        <div className="flex flex-col max-w-md">
          <p className="text-3xl sm:text-4xl font-bold">LKS</p>
          <p className="text-sm sm:text-base mt-1">
            Terjual <span className="font-semibold">100+</span>
          </p>
          <p className="my-4 text-3xl sm:text-5xl font-bold text-[#CD242C]">
            Rp{price.toLocaleString()}
          </p>
          <p className="font-bold mb-2">Pilih kelas:</p>
          <ButtonKelas />
          <p className="my-2 font-bold text-gray-300 dark:text-gray-400">Deskripsi :</p>
          <p className="text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dignissimos error magnam quidem, aperiam possimus culpa eveniet!
            Illum ad harum natus, exercitationem, beatae odit quae eius rerum
            omnis iusto molestias!
          </p>
        </div>

        {/* Box Pesanan */}
        <div className="flex flex-col p-4 gap-4 border border-red-500 rounded-md w-full sm:w-80 bg-transparent text-black dark:text-white lg:sticky lg:top-10">
          <h2 className="text-lg font-semibold text-center lg:text-left">
            Buat pesanan anda
          </h2>
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <img
              src="../images/product.jpeg"
              width={48}
              height={48}
              alt="LKS"
              className="w-12 h-12 object-cover rounded-sm"
            />
            <p className="font-semibold">LKS</p>
          </div>
          <hr className="border-gray-600" />
          <div className="flex items-center justify-between">
            <Counter quantity={quantity} setQuantity={setQuantity} />
            <span className="ml-2 text-sm text-gray-400">Stok: 250</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Subtotal :</span>
            <span className="text-red-500 text-xl font-semibold">
              Rp {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Poin Anda :</span>
            <span className="text-green-500 text-xl font-semibold">
              {userPoints}
            </span>
          </div>
          <button className="w-full border border-gray-500 py-2 rounded-md hover:bg-red-500 hover:border-red-500 transition duration-300 font-semibold">
            Metode Pembayaran
          </button>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-red-500 py-2 rounded-md text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Beli Sekarang"}
          </button>
        </div>
      </div>

      <Footer />

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
