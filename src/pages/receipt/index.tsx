import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
import { useLocation } from "react-router-dom";

export default function ReceiptPage() {
  const location = useLocation();
  const { order } = location.state || {}; // Assume order data passed via state

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Data pesanan tidak ditemukan.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Struk Pembelian</h1>
          <div className="bg-white dark:bg-[#100C0C] border border-black dark:border-white rounded-lg p-6 shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Detail Produk</h2>
              <p><strong>Nama Produk:</strong> {order.productName}</p>
              <p><strong>Jumlah:</strong> {order.quantity}</p>
              <p><strong>Harga per Unit:</strong> Rp {order.price.toLocaleString()}</p>
              <p><strong>Total Harga:</strong> Rp {(order.price * order.quantity).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Detail Pembelian</h2>
              <p><strong>Poin Digunakan:</strong> {order.pointsUsed}</p>
              <p><strong>Tanggal Pembelian:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Nomor Resi:</strong> {order.resiNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">Terima Kasih atas Pembelian Anda!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
