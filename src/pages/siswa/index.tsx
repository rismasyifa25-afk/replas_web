import React from "react";
import { Link } from "react-router-dom";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";
import FooterLayouts from "@/components/layouts/FooterSiswa";
import ButtonExternal from "@/components/element/Button/Index";
import SiswaProductSection from "@/components/fragments/SiswaProductSection";
import SearchBar from "@/components/fragments/SearchBar";

const sampleProducts = [
  { id: 1, image: "/images/product.jpeg", title: "Emblem", price: "Rp 17.000" },
  { id: 2, image: "/images/product.jpeg", title: "Badge", price: "Rp 4.000" },
  { id: 3, image: "/images/product.jpeg", title: "Topi", price: "Rp 20.000" },
  { id: 4, image: "/images/product.jpeg", title: "Soal Matematika", price: "Rp 16.000" },
  { id: 5, image: "/images/product.jpeg", title: "LKS Agama", price: "Rp 22.000" },
];

const bankSampahLocations = [
  {
    id: 1,
    name: "Bank Sampah Utama",
    location: "Depan Gedung BCS Lt. 1",
    hours: "07.00 - 15.00 WIB",
    status: "Aktif",
  },
];

function Index() {
  return (
    <>
      <SiswaNavbar />

      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center px-4 xl:px-32 mt-6 md:mt-12 gap-y-8 md:gap-x-12">
        <div className="w-full md:w-4/6 px-4 lg:px-10 text-center md:text-left">
          <h1 className="text-3xl lg:text-5xl md:text-4xl xl:text-7xl font-extrabold">
            <span className="text-[#CD242C]">Selamat Datang di Replas</span> Platform Cerdas untuk Bank Sampah, Koperasi, dan Layanan Printing
          </h1>
          <p className="text-base md:text-xl lg:2xl mt-4 text-[color:var(--placeholder)]">
            Replas memadukan sistem bank sampah otomatis dengan teknologi sensorik yang menghitung setiap botol plastik yang Anda setor.  
            Tukarkan poin Anda untuk membeli berbagai barang koperasi seperti topi, emblem, dan perlengkapan sekolah, atau gunakan layanan printing sekolah dengan mudah dan cepat.
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-col md:flex-row w-full gap-4 mt-6 items-center justify-center md:justify-start text-center">
            <Link to="/siswa" className="w-full md:w-auto flex justify-center">
              <ButtonExternal variant="flex bg-[#CD242C] border hover:bg-transparent w-full md:w-fit py-2 px-4 md:py-4 md:px-6 rounded-xl md:rounded-full text-base md:text-md lg:text-2xl font-semibold border-[#CD242C] hover:text-[#CD242C] text-white hover:stroke-white justify-center items-center">
                <h1 className="mr-2 w-full text-center">Start Shopping</h1>
              </ButtonExternal>
            </Link>

            <Link to="/siswa/printing" className="w-full md:w-auto flex justify-center">
              <ButtonExternal variant="flex bg-transparent border hover:bg-[#CD242C] w-full md:w-fit py-2 px-4 md:py-4 md:px-6 rounded-xl md:rounded-full text-base md:text-md lg:text-2xl font-semibold border-[#CD242C] hover:text-white text-[#CD242C] hover:stroke-white justify-center items-center">
                <h1 className="mr-2 w-full text-center">Start Printing</h1>
              </ButtonExternal>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-4/6 px-4 md:px-10 flex justify-center items-center">
          <div className="w-full flex justify-center px-12 md:px-12 2xl:px-24 h-fit">
            <img
              width={500}
              height={300}
              className="w-full rounded-xl"
              src="/images/smk6.jpeg"
              alt="SMK 6 Building"
            />
          </div>
        </div>
      </div>

      {/* Bank Sampah Section */}
      <div className="w-full px-4 xl:px-32 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-[color:var(--text-primary)]">
            Bank Sampah <span className="text-[#CD242C]">Replas</span>
          </h2>
          <p className="text-center text-base md:text-lg text-[color:var(--placeholder)] mb-12 max-w-3xl mx-auto">
            Sistem bank sampah otomatis dengan teknologi sensor yang menghitung setiap botol plastik yang Anda setor
          </p>

          {/* Cara Kerja Alat */}
          <div className="bg-[color:var(--background-secondary)] rounded-2xl shadow-lg p-6 md:p-10 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[color:var(--text-primary)]">Cara Kerja Alat</h3>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src="/images/bank-sampah-device.jpeg"
                  alt="Alat Bank Sampah"
                  className="w-full rounded-xl shadow-md"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                {[
                  { step: 1, title: "Masukkan Botol Plastik", desc: "Letakkan botol plastik bekas ke dalam lubang input mesin" },
                  { step: 2, title: "Sensor Menghitung Otomatis", desc: "Teknologi sensor mendeteksi dan menghitung jumlah botol secara akurat" },
                  { step: 3, title: "Dapatkan Poin Reward", desc: "Poin otomatis masuk ke akun Anda dan bisa ditukar dengan produk koperasi" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#CD242C] text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-[color:var(--text-primary)]">{item.title}</h4>
                      <p className="text-[color:var(--placeholder)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lokasi Bank Sampah */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--text-primary)]">Titik Lokasi Bank Sampah</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {bankSampahLocations.map((loc) => (
                  <div key={loc.id} className="bg-[color:var(--background-secondary)] rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-xl text-[#CD242C]">{loc.name}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-semibold">
                        {loc.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#CD242C] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0z" />
                        </svg>
                        <p className="text-[color:var(--placeholder)]">{loc.location}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#CD242C] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[color:var(--placeholder)]">{loc.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#CD242C] to-red-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Mulai Setor Sampah Sekarang!</h3>
            <p className="text-lg mb-6 opacity-90">
              Tukar botol plastik bekas Anda dengan poin reward yang bisa ditukar produk koperasi
            </p>
            <Link to="/siswa/bank-sampah">
              <button className="bg-white text-[#CD242C] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Produk */}
      <SearchBar placeholder="Search..." />
      <div className="max-w-7xl mx-auto">
        <SiswaProductSection title="Buku" products={sampleProducts} rows={1} />
      </div>

      <FooterLayouts />
    </>
  );
}

export default Index;
