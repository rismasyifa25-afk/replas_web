import React from "react";
import Navbar from "@/components/layouts/NavbarLayout";
import Footer from "@/components/layouts/FooterLayouts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Printer, ShoppingCart, CreditCard, Recycle, Award } from "lucide-react";

const services = [
  {
    title: "Layanan Printing",
    description: "Cetak dokumen, tugas, dan materi belajar dengan kualitas tinggi dan harga terjangkau.",
    icon: Printer,
    image: "https://via.placeholder.com/300x200?text=Printing",
  },
  {
    title: "Pembelian Online",
    description: "Beli produk koperasi secara online dengan mudah dan praktis dari mana saja.",
    icon: ShoppingCart,
    image: "https://via.placeholder.com/300x200?text=Online+Shopping",
  },
  {
    title: "Pengambilan di BCS",
    description: "Ambil pesanan Anda di Bank Sampah Cerdas (BCS) sekolah tanpa ribet.",
    icon: Recycle,
    image: "https://via.placeholder.com/300x200?text=Pickup+BCS",
  },
  {
    title: "Pembayaran Praktis",
    description: "Bayar dengan poin, tunai, atau digital payment untuk kemudahan transaksi.",
    icon: CreditCard,
    image: "https://via.placeholder.com/300x200?text=Easy+Payment",
  },
  {
    title: "Bank Sampah",
    description: "Tukar botol plastik dengan poin untuk mendukung lingkungan bersih.",
    icon: Recycle,
    image: "https://via.placeholder.com/300x200?text=Bank+Sampah",
  },
  {
    title: "Konversi Poin",
    description: "Konversi poin Anda menjadi produk atau layanan di koperasi sekolah.",
    icon: Award,
    image: "https://via.placeholder.com/300x200?text=Point+Conversion",
  },
];

function ServicePage() {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Layanan <span className="text-red-600">Kami</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Jelajahi berbagai layanan yang kami sediakan untuk mendukung kegiatan sekolah dan lingkungan.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <section className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <img 
            src="https://via.placeholder.com/400x300?text=Support+Team" 
            alt="Support Team" 
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Butuh Bantuan?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Kami siap membantu Anda dengan layanan terbaik. Hubungi kami sekarang!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              <div className="flex items-center gap-2 text-red-600">
                <Phone className="w-5 h-5" />
                <span>+62 812-3456-7890</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ServicePage;
