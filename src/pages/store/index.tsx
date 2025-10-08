import Navbar from "@/components/layouts/NavbarLayout";
import Footer from "@/components/layouts/FooterLayouts";
import SearchBar from "@/components/fragments/SearchBar";
import ProductSection from "@/components/fragments/ProductSection";


const sampleProducts = [
  { id: 1, image: "/images/product.jpeg", title: "Emblem", price: "Rp 17.000" },
  { id: 2, image: "/images/product.jpeg", title: "Badge", price: "Rp 4.000" },
  { id: 3, image: "/images/product.jpeg", title: "Topi", price: "Rp 20.000" },
  { id: 4, image: "/images/product.jpeg", title: "Soal Matematika", price: "Rp 16.000" },
  { id: 5, image: "/images/product.jpeg", title: "LKS Agama", price: "Rp 22.000" },
  { id: 6, image: "/images/product.jpeg", title: "LKS Olah Raga", price: "Rp 17.000" },
  { id: 7, image: "/images/product.jpeg", title: "Buku IPA", price: "Rp 18.000" },
  { id: 8, image: "/images/product.jpeg", title: "Buku IPS", price: "Rp 19.000" },
  { id: 1, image: "/images/product.jpeg", title: "Badge", price: "Rp 17.000" },
  { id: 2, image: "/images/product.jpeg", title: "Emblem", price: "Rp 4.000" },
  { id: 3, image: "/images/product.jpeg", title: "LKS Agama", price: "Rp 20.000" },
  { id: 4, image: "/images/product.jpeg", title: "LKS Olah Raga", price: "Rp 16.000" },
  { id: 5, image: "/images/product.jpeg", title: "Topi", price: "Rp 22.000" },
  { id: 6, image: "/images/product.jpeg", title: "Soal Matematika", price: "Rp 17.000" },
  { id: 7, image: "/images/product.jpeg", title: "Buku IPA", price: "Rp 18.000" },
  { id: 8, image: "/images/product.jpeg", title: "Buku IPS", price: "Rp 19.000" },
];

export function ProductPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-6">
        <div className="main my-15">
          <div className="max-w-7xl mx-auto">
            <div className="z-50 mt-[-50px]">
              <SearchBar placeholder="Search..." />
            </div>
            <ProductSection title="Buku" products={sampleProducts} />
            <ProductSection title="LKS" products={sampleProducts} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
