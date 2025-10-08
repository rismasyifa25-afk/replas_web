import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 lg:px-24 flex flex-col mt-52">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C]">
            About Scholair
          </h1>
          <p className="text-md text-[color:var(--tulisan-nonprimary)]">
            "scholair adalah web berbentuk e-commerce yang bertujuan untuk
            membantu kooperasi sekolah dalam penjualan barang yang dibutuhkan
            siswa dengan sistem pembayaran secara online yang dapat meningkatkan
            fleksibilitas pembayaran"
          </p>
        </div>
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C]">
            Quick Links
          </h1>
          <div className="text-md text-[color:var(--tulisan-nonprimary)]">
            <ul className="flex flex-col text-left gap-4 cursor-pointer">
              <Link to="/" className="font-bold text-[#848484]">
                Home
              </Link>
              <Link to="/store" className="font-bold text-[#848484]">
                Store
              </Link>
              <Link to="/about" className="font-bold text-[#848484]">
                About
              </Link>
              <Link to="/contact" className="font-bold text-[#848484]">
                Contact
              </Link>
              <Link to="/service" className="font-bold text-[#848484]">
                Service
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C] ">
            Social Media
          </h1>
          <div className="flex gap-3 cursor-pointer">
            <Link to={'/'}><Instagram size={32}  className="stroke-[color:var(--primary)]" />{" "}</Link>
            <Link to={'/'}><Twitter size={32}  className="stroke-[color:var(--primary)]" />{" "}</Link>
            <Link to={'/'}><Facebook size={30}  className="stroke-[color:var(--primary)] -ml-2" /></Link>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-5 mt-5 border-t border-[color:var(--border)] py-3 text-center text-[color:var(--tulisan-nonprimary)] text-xs md:text-sm">
        <p>&copy; 2025 Scholair. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;