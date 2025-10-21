import Navbar from "@/components/layouts/SiswaNavbar";
import Footer from "@/components/layouts/FooterSiswa";


function BankSampah() {
  return (
    <>
      <Navbar />
      <div className="px-4 xl:px-32 py-16 bg-[color:var(--background)] text-[color:var(--text-primary)]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pelajari Lebih Lanjut Tentang{" "}
            <span className="text-[#CD242C]">Bank Sampah Replas</span>
          </h1>
          <p className="text-lg text-[color:var(--placeholder)] mb-10">
            Sebelum Anda menyetor botol plastik, pastikan jenis dan ukurannya
            sesuai agar sistem sensorik Replas dapat menghitung dengan akurat.
          </p>

          <img
            src="/images/bank-sampah-device.jpeg"
            alt="Alat Bank Sampah Replas"
            className="rounded-xl shadow-lg w-full max-w-3xl mx-auto mb-12"
          />

          {/* ✅ BOTOL YANG DITERIMA */}
          <div className="text-left mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#CD242C] text-center">
              Jenis Botol yang Dapat Diterima ✅
            </h2>
            <p className="text-center text-[color:var(--placeholder)] mb-8">
              Hanya botol plastik jenis PET (Polyethylene Terephthalate) yang bisa dimasukkan ke alat Replas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[color:var(--background-secondary)] rounded-xl shadow-md p-6 text-center">
                <img
                  src="/images/botol-air.jpg"
                  alt="Botol Air Mineral"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-xl mb-1">Botol Air Mineral</h3>
                <p className="text-[color:var(--placeholder)]">
                  Ukuran kecil (≤ 600ml) dan besar (≥ 1L) diterima.
                </p>
              </div>

            
            </div>
          </div>

          {/* ❌ BOTOL YANG TIDAK DITERIMA */}
          <div className="text-left mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#CD242C] text-center">
              Jenis Botol yang Tidak Dapat Diterima ❌
            </h2>
            <p className="text-center text-[color:var(--placeholder)] mb-8">
              Sistem Replas hanya mendeteksi plastik PET. Material lain tidak akan dihitung.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[color:var(--background-secondary)] rounded-xl shadow-md p-6 text-center">
                <img
                  src="/images/botol-kaca.jpg"
                  alt="Botol Kaca"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-xl mb-1">Botol Kaca</h3>
                <p className="text-[color:var(--placeholder)]">
                  Tidak diterima, karena berisiko pecah dan tidak bisa terbaca sensor.
                </p>
              </div>
              <div className="bg-[color:var(--background-secondary)] rounded-xl shadow-md p-6 text-center">
                <img
                  src="/images/botol-logam.jpg"
                  alt="Botol Logam"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-xl mb-1">Botol Logam / Kaleng</h3>
                <p className="text-[color:var(--placeholder)]">
                  Sensor tidak mendeteksi logam, jadi poin tidak akan masuk.
                </p>
              </div>
              <div className="bg-[color:var(--background-secondary)] rounded-xl shadow-md p-6 text-center">
                <img
                  src="/images/botol-opaque.jpg"
                  alt="Botol Opaque"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-xl mb-1">Plastik Pekat</h3>
                <p className="text-[color:var(--placeholder)]">
                  Plastik berwarna pekat (tidak transparan) sulit terbaca oleh sensor.
                </p>
              </div>
            </div>
          </div>

       
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BankSampah;
