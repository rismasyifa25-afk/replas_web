import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../mode-toggle";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/product", label: "Product" },
  ];

  const reportsSublinks = [
    { to: "/admin/reports/monitoring", label: "Monitoring Alat (Room + Cam)" },
    { to: "/admin/reports/sales", label: "Laporan Sampah Plastik" },
  ];

  const usersSublinks = [
    { to: "/admin/users", label: "CRUD User Account (can view details)" },
  ];

  const ordersSublinks = [
    { to: "/admin/orders/product", label: "Monitoring List Pesanan Siswa (Product)" },
    { to: "/admin/orders/printing", label: "Monitoring Jasa (Print2)" },
    { to: "/admin/orders/history", label: "Monitoring History Pembelian Siswa" },
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
          <span className="ml-2 font-bold text-[color:var(--text-color)]">Admin Panel</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`font-bold cursor-pointer ${
                  location.pathname.startsWith('/admin/users') ? "text-[#CD242C]" : "text-[color:var(--text-color)]"
                }`}
              >
                Users
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuLabel>User Management</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {usersSublinks.map((link) => (
                  <DropdownMenuItem key={link.to}>
                    <Link 
                      to={link.to} 
                      className={`w-full ${
                        location.pathname === link.to ? "text-[#CD242C]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-bold cursor-pointer ${
                  location.pathname.startsWith('/admin/orders') ? "text-[#CD242C]" : "text-[color:var(--text-color)]"
                }`}
              >
                Orders
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuLabel>Orders</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ordersSublinks.map((link) => (
                  <DropdownMenuItem key={link.to}>
                    <Link
                      to={link.to}
                      className={`w-full ${
                        location.pathname === link.to ? "text-[#CD242C]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-bold cursor-pointer ${
                  location.pathname.startsWith('/admin/reports') ? "text-[#CD242C]" : "text-[color:var(--text-color)]"
                }`}
              >
                Reports
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuLabel>Reports</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {reportsSublinks.map((link) => (
                  <DropdownMenuItem key={link.to}>
                    <Link
                      to={link.to}
                      className={`w-full ${
                        location.pathname === link.to ? "text-[#CD242C]" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="">
            <ThemeToggle />
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              className="cursor-pointer text-[#CD242C] hover:text-white"
            >
              <Link to="/auth/logout">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>

          <div className="w-12 h-12 rounded-full border border-[#CD242C] overflow-hidden items-center justify-center md:block hidden">
            <Link to="/admin/profile">
              <img
                width={48}
                height={48}
                src="/images/wongsigma.png"
                alt="Admin"
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
        className={`fixed top-0 left-0 h-full w-4/5 sm:w-64 bg-[color:var(--background)] shadow-lg z-1010 transform flex flex-col ${
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
        <div className="flex-1 overflow-y-auto">
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

  {/* Users Section for Mobile */}
  <div className={`font-bold ${
    location.pathname.startsWith('/admin/users') ? "text-[#CD242C]" : ""
  }`}>
    Users
  </div>
  {usersSublinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`font-bold pl-6 ${
        location.pathname === link.to ? "text-[#CD242C]" : ""
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      {link.label}
    </Link>
  ))}

  {/* Orders Section for Mobile */}
  <div className={`font-bold ${
    location.pathname.startsWith('/admin/orders') ? "text-[#CD242C]" : ""
  }`}>
    Orders
  </div>
  {ordersSublinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`font-bold pl-6 ${
        location.pathname === link.to ? "text-[#CD242C]" : ""
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      {link.label}
    </Link>
  ))}

  {/* Reports Section for Mobile */}
  <div className={`font-bold ${
    location.pathname.startsWith('/admin/reports') ? "text-[#CD242C]" : ""
  }`}>
    Reports
  </div>
  {reportsSublinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`font-bold pl-6 ${
        location.pathname === link.to ? "text-[#CD242C]" : ""
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      {link.label}
    </Link>
  ))}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="mt-4">
            <Button
              variant="outline"
              className="cursor-pointer text-[#CD242C] hover:text-white w-full"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Link to="/auth/logout" className="w-full flex items-center justify-center">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>

          {/* Tambahkan bagian profil di bawah tombol logout */}
          <div className="flex items-center gap-3 mt-4 border-t border-gray-300 pt-4">
            <Link
              to="/admin/profile"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src="/images/wongsigma.png"
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border border-[#CD242C]"
              />
              <span className="font-semibold">Admin Profile</span>
            </Link>
          </div>
        </div>

      </div>

    </>
  );
}

export default AdminNavbar;
