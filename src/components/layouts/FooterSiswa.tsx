import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const navLinks = [
    { to: "/siswa", label: "Home" },
    { to: "/siswa/about", label: "About" },
    { to: "/siswa/store", label: "Store" },
    { to: "/siswa/printing", label: "Service" },
    { to: "/siswa/contact", label: "Contact" },
  ];

  return (
    <footer className="w-full px-6 md:px-12 lg:px-24 flex flex-col mt-52">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
        {/* ABOUT */}
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C]">
            About Replas
          </h1>
          <p className="text-md text-[color:var(--tulisan-nonprimary)]">
            "Replas memadukan sistem bank sampah otomatis dengan teknologi
            sensorik yang menghitung setiap botol plastik yang Anda setor. Poin
            yang terkumpul dapat ditukarkan untuk membeli barang koperasi
            seperti topi, emblem, dan perlengkapan sekolah, atau digunakan untuk
            layanan printing sekolah dengan mudah dan cepat. Replas, solusi
            digital untuk sekolah yang peduli lingkungan dan efisien."
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C]">
            Quick Links
          </h1>
          <ul className="flex flex-col text-left gap-4 cursor-pointer text-md text-[color:var(--tulisan-nonprimary)]">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-bold text-[#848484] hover:text-[#CD242C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex flex-1 flex-col min-w-0 mb-6 md:mb-0">
          <h1 className="text-2xl font-semibold mb-2 text-[#CD242C]">
            Social Media
          </h1>
          <div className="flex gap-3 cursor-pointer">
            <Link to="#">
              <Instagram size={32} className="stroke-[color:var(--primary)]" />
            </Link>
            <Link to="#">
              <Twitter size={32} className="stroke-[color:var(--primary)]" />
            </Link>
            <Link to="#">
              <Facebook
                size={30}
                className="stroke-[color:var(--primary)] -ml-2"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full px-2 md:px-5 mt-5 border-t border-[color:var(--border)] py-3 text-center text-[color:var(--tulisan-nonprimary)] text-xs md:text-sm">
        <p>&copy; 2025 Scholair. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
