import TeamCard from "@/components/fragments/TeamCard";
import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";

export function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="w-full h-fit">
        <div className="my-20 flex flex-col items-center text-center px-6">
          {/* Judul */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-black dark:text-white">
            Tentang <span className="text-red-600">Kami</span>
          </h2>

          {/* Deskripsi */}
          <p className="mt-6 max-w-2xl text-gray-400 dark:text-gray-500 text-base md:text-lg leading-relaxed">
            Kami adalah platform terbaik untuk melakukan transaksi jual beli
            keperluan sekolah tanpa iklan. Dukung kami agar selalu mengembangkan
            ide-ide luar biasa lainnya.
          </p>
        </div>

        <TeamCard />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
