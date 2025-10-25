import TeamCard from "@/components/fragments/TeamCard";
import Footer from "@/components/layouts/FooterSiswa";
import Navbar from "@/components/layouts/SiswaNavbar";
import { RefreshCw, DollarSign, Cpu } from "lucide-react";

export function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <section className="mb-16">
          {/* About Us Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
              <span className="text-sm font-semibold">About Us</span>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction to <span className="text-red-600">Replas</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Replas adalah aplikasi cerdas yang menggabungkan sistem bank sampah dengan teknologi sensorik. Cukup tukarkan botol plastik Anda untuk mendapatkan poin yang dapat digunakan di koperasi atau layanan printing sekolah, sekaligus mendukung ekonomi mandiri siswa.
            </p>
          </div>

          {/* Feature Boxes */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Eco-Friendly Recycling</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Tukar botol plastik untuk poin lingkungan</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student Economy</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Dukung ekonomi mandiri siswa sekolah</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Technology</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Teknologi sensorik canggih untuk kemudahan</p>
            </div>
          </div>

          {/* Images Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative">
              <img 
                src="https://via.placeholder.com/600x400?text=Team+Working" 
                alt="Team working on Replas" 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="relative">
              <img 
                src="https://via.placeholder.com/300x300?text=App+Demo" 
                alt="Replas App Demo" 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-red-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <TeamCard />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
