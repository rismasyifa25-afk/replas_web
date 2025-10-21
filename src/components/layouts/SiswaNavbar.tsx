import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../mode-toggle";
import { useState } from "react";
import { Menu, X, Camera } from "lucide-react";

function SiswaNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/siswa", label: "Home" },
    { to: "/siswa/store", label: "Store" },
    { to: "/siswa/about", label: "About" },
    { to: "/siswa/contact", label: "Contact" },

    { to: "/siswa/printing", label: "Service" },
  ];

  return (
    <>
      <nav className="w-full flex h-8 justify-between items-center md:px-12 px-4 py-8 bg-[color:var(--navbar)] backdrop-blur-xl shadow-lg sticky top-0 z-1000 mb-12">
        <div className="flex items-center">
          <img
            width={120}
            height={120}
            className="h-6 md:h-8"
            src="scholair.svg"
            alt="Logo"
          />
        </div>
        <div className="hidden md:flex">
          <ul className="flex gap-4 cursor-pointer text-center text-[color:var(--text-color)]">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-bold ${
                  location.pathname === link.to ? "text-[#CD242C]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          <div className="">
            <ThemeToggle />
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              className="cursor-pointer text-[#CD242C] hover:text-white"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>

          <div className="w-12 h-12 rounded-full border border-[#CD242C] overflow-hidden items-center justify-center md:block hidden">
            <Link to="/siswa/ProfileSiswa">
              <img
                width={48}
                height={48}
                src="/images/wongsigma.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <div className="md:hidden block mt-1.5">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu />
            </button>
          </div>
        </div>
      </nav>
      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[color:var(--background)] shadow-lg z-1010 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <div className="justify-between flex w-full">
            <img src="scholair.svg" width={120} alt="" />
            <button onClick={() => setIsSidebarOpen(false)}>
              <X />
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-4 p-4 cursor-pointer text-[color:var(--text-color)]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-bold ${
                location.pathname === link.to ? "text-[#CD242C]" : ""
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4">
            <Button
              variant="outline"
              className="cursor-pointer text-[#CD242C] hover:text-white w-full"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Link to="/login" className="w-full">
                Login
              </Link>
            </Button>
          </div>

          {/* Tambahkan bagian profil di bawah tombol login */}
          <div className="flex items-center gap-3 mt-4 border-t border-gray-300 pt-4">
            <Link
              to="/siswa/ProfileSiswa"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src="/images/wongsigma.png"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-[#CD242C]"
              />
              <span className="font-semibold">Profil Saya</span>
            </Link>
          </div>
        </ul>
      </div>
    </>
  );
}

export default SiswaNavbar;
