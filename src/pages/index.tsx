import ButtonExternal from "@/components/element/Button/Index";
import ProductSection from "@/components/fragments/ProductSection";
import SearchBar from "@/components/fragments/SearchBar";
import Footer from "@/components/layouts/FooterLayouts";
import Navbar from "@/components/layouts/NavbarLayout";
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

function Main() {
  return (
    <>
      <Navbar />
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center px-4 xl:px-32 mt-6 md:mt-12 gap-y-8 md:gap-x-12">
        <div className="w-full md:w-4/6 px-4 lg:px-10 text-center md:text-left">
          <h1 className="text-3xl lg:text-5xl md:text-4xl xl:text-7xl font-extrabold">
            <span className="text-[#CD242C]">Welcome To Scholair</span> Beli
            Kebutuhan Belajar Anda
          </h1>
          <p className="text-base md:text-xl lg:2xl mt-4 text-[color:var(--placeholder)]">
            Scholair adalah tempat penyedia perlengkapan sekolah termudah yang
            pernah ada. Cari perlengkapan sekolah anda dengan cepat dengan
            menggunakan web ini. Selamat berbelanja!
          </p>
          <div className="flex flex-col md:flex-row w-full gap-4 mt-6 items-center justify-center md:justify-start text-center">
            <Link to="/store" className="w-full md:w-auto flex justify-center">
              <ButtonExternal variant="flex bg-[#CD242C] border hover:bg-transparent w-full md:w-fit py-2 px-4 md:py-4 md:px-6 rounded-xl md:rounded-full text-base md:text-md lg:text-2xl font-semibold border-[#CD242C] hover:text-[#CD242C] text-white hover:stroke-white justify-center items-center">
                <h1 className="mr-2 w-full text-center">Start Shopping</h1>
              </ButtonExternal>
            </Link>

            <Link
              to="/service"
              className="w-full md:w-auto flex justify-center"
            >
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
              src="./images/smk6.jpeg"
              alt="SMK 6 Building"
            />
          </div>
        </div>
      </div>
      <SearchBar placeholder="Search..." />
      <div className="max-w-7xl mx-auto">
        <ProductSection title="Buku" products={sampleProducts} rows={1} />
      </div>
      <Footer />
    </>
  );
}

export default Main;
