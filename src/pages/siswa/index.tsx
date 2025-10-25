import ButtonExternal from "@/components/element/Button/Index";
import SiswaProductSection from "@/components/fragments/SiswaProductSection";
import SearchBar from "@/components/fragments/SearchBar";
import FooterLayouts from "@/components/layouts/FooterSiswa";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";
import { Link } from "react-router-dom";

const sampleProducts = [
  { id: 1, image: "/images/product.jpeg", title: "Emblem", price: "Rp 17.000" },
  { id: 2, image: "/images/product.jpeg", title: "Badge", price: "Rp 4.000" },
  { id: 3, image: "/images/product.jpeg", title: "Topi", price: "Rp 20.000" },
  {
    id: 4,
    image: "/images/product.jpeg",
    title: "Soal Matematika",
    price: "Rp 16.000",
  },
  {
    id: 5,
    image: "/images/product.jpeg",
    title: "LKS Agama",
    price: "Rp 22.000",
  },
];

const bankSampahLocations = [
  {
    id: 1,
    name: "Bank Sampah Utama",
    location: "Depan Gedung BCS Lt. 1",
    status: "Aktif",
  },
];

function Index() {
  return (
    <>
      <SiswaNavbar />
      <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center xl:px-32  gap-y-8 md:gap-x-12">
        <div className="w-full md:w-4/6 px-2 lg:px-5 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl md:text-3xl xl:text-6xl font-extrabold text-[#CD242C]">
            SMKN 6 MALANG - Business Center
          </h1>
          <h2 className="text-black text-2xl font-bold mt-2">
            Platform Terintegrasi untuk Bank Sampah, Koperasi, dan Layanan
            Printing{" "}
          </h2>
          <p className="text-base md:text-xl lg:2xl mt-2 text-[color:var(--placeholder)]">
            Replas adalah alat cerdas yang menggabungkan sistem bank sampah
            dengan teknologi sensorik. Cukup tukarkan botol plastik Anda untuk
            mendapatkan poin yang dapat digunakan di koperasi atau layanan
            printing sekolah, sekaligus mendukung ekonomi mandiri siswa.
          </p>
          <div className="flex flex-col md:flex-row w-full gap-4 mt-6 items-center justify-center md:justify-start text-center">
            <Link to="/siswa/store" className="w-full md:w-auto flex justify-center">
              <ButtonExternal variant="flex bg-[#CD242C] border hover:bg-transparent w-full md:w-fit md:py-4 md:px-6 rounded-xl md:rounded-full text-base md:text-md lg:text-xl font-semibold border-[#CD242C] hover:text-[#CD242C] text-white hover:stroke-white justify-center items-center">
                <p className=" w-full text-center">Start Shopping</p>
              </ButtonExternal>
            </Link>

            <Link
              to="/siswa/printing"
              className="w-full md:w-auto flex justify-center"
            >
              <ButtonExternal variant="flex bg-transparent border hover:bg-[#CD242C] w-full md:w-fit py-2 px-4 md:py-4 md:px-6 rounded-xl md:rounded-full text-base md:text-md lg:text-xl font-semibold border-[#CD242C] hover:text-white text-[#CD242C] hover:stroke-white justify-center items-center">
                <p className=" w-full text-center">Start Printing</p>
              </ButtonExternal>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-4/6 px-4 md:px-10 flex justify-center items-center">
          <div className="w-full flex justify-center px-12 md:px-12 h-fit">
            <img
              width={600}
              height={400}
              className="w-full rounded-xl"
              src="./images/smk6.jpeg"
              alt="SMK 6 Building"
            />
          </div>
        </div>
      </div>

      {/* Bank Sampah Section */}
      <div className="w-full px-4 xl:px-32 mt-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-[color:var(--text-primary)]">
            Bank Sampah <span className="text-[#CD242C]">Replas</span>
          </h2>
          <p className="text-center text-base md:text-lg text-[color:var(--placeholder)] mb-12 max-w-3xl mx-auto">
            Sistem bank sampah otomatis dengan teknologi sensor yang menghitung
            setiap botol plastik yang Anda setor
          </p>

          {/* Gambaran Alat */}
          <div className=" md:p-10 mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <img
                  src="./images/bank-sampah-device.jpeg"
                  alt="Alat Bank Sampah"
                  className="w-full h-64   rounded-xl shadow-md"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold mb-10 text-[color:var(--text-primary)]">
                  Cara Kerja Alat
                </h3>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#CD242C] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-[color:var(--text-primary)]">
                      Masukkan Botol Plastik
                    </h4>
                    <p className="text-[color:var(--placeholder)]">
                      Letakkan botol plastik bekas ke dalam lubang input mesin
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#CD242C] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-[color:var(--text-primary)]">
                      Sensor Menghitung Otomatis
                    </h4>
                    <p className="text-[color:var(--placeholder)]">
                      Teknologi sensor mendeteksi dan menghitung jumlah botol
                      secara akurat
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#CD242C] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-[color:var(--text-primary)]">
                      Dapatkan Poin Reward
                    </h4>
                    <p className="text-[color:var(--placeholder)]">
                      Poin otomatis masuk ke akun Anda dan bisa ditukar dengan
                      produk koperasi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lokasi Bank Sampah */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[color:var(--text-primary)]">
              Titik Lokasi Bank Sampah
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {bankSampahLocations.map((location) => (
                  <div
                    key={location.id}
                    className=" bg-[color:var(--background-secondary)] rounded-xl shadow-lg p-7 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-xl text-[#CD242C]">
                        {location.name}
                      </h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-semibold">
                        {location.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-[#CD242C] mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-[color:var(--placeholder)]">
                          {location.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-30 w-full">
        <SearchBar placeholder="Search..." />
        <div className="max-w-7xl mx-auto">
          <SiswaProductSection title="Buku" products={sampleProducts} rows={1} />
        </div>
      </div>
      {/* CTA Section */}
      <div className="w-7xl justify-center mx-auto">
        <div className="bg-gradient-to-r from-[#CD242C] to-red-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Mulai Setor Sampah Sekarang!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Tukar botol plastik bekas Anda dengan poin reward yang bisa ditukar
            produk koperasi
          </p>
          <Link to="/siswa/bank-sampah">
            <button className="bg-white text-[#CD242C] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Pelajari Lebih Lanjut
            </button>
          </Link>
        </div>
      </div>
      <FooterLayouts />
    </>
  );
}

export default Index;
