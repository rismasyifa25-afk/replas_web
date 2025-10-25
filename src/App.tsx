import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// ===== Pages =====
import Index from "./pages"; // Home utama
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ServicePage from "./pages/services";
import ContactPage from "./pages/contact";
import ProductPage from "./pages/store";
import AboutPage from "./pages/aboutUs";
import UserEdit from "./pages/profile/userEdit";
import HistoryPage from "./pages/profile/history";
import ProductDetailPage from "./pages/product";
import BankSampah from "./pages/BankSampah";
import ReceiptPage from "./pages/receipt";

// ===== Siswa =====
import SiswaPage from "./pages/siswa";
import SiswaPrintingPage from "./pages/siswa/printing";
import AboutSiswa from "./pages/siswa/AboutSiswa";
import ContactSiswa from "./pages/siswa/ContactSiswa";
import ProfileSiswa from "./pages/siswa/ProfileSiswa";
import BankSampahSiswa from "./pages/siswa/bank-sampah";

// ===== Admin Dashboard =====
import Layout from "./pages/AdminDashboard/layout";
import AdminDashboard from "./pages/AdminDashboard";
import PrintingDashboard from "./pages/AdminDashboard/printing";
import UploadItem from "./pages/AdminDashboard/uploadItem";
import MonitoringPage from "./pages/AdminDashboard/monitoring";
import AdminProfile from "./pages/AdminDashboard/profile";
import AdminOrdersProduct from "./pages/AdminDashboard/orders/product";
import AdminOrdersHistory from "./pages/AdminDashboard/orders/history";
import AdminSettings from "./pages/AdminDashboard/settings";
import ProductDetailSiswaPage from "./pages/siswa/ProductDetailSiswaPage";
import StoreSiswa from "./pages/siswa/StoreSiswa";
import RoomPage from "./pages/room/[id]";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        {/* ===== HOME PAGE ===== */}
        <Route path="/" element={<Index />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ===== GENERAL PAGES ===== */}
        <Route path="/service" element={<ServicePage />} />
        <Route path="/bank-sampah" element={<BankSampah />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/store" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* ===== USER PROFILE ===== */}
        <Route path="/useredit" element={<UserEdit />} />
        <Route path="/history" element={<HistoryPage />} />

        {/* ===== SISWA ===== */}
        <Route path="/siswa" element={<SiswaPage />} />
        <Route path="/siswa/store" element={<StoreSiswa />} />
        <Route path="/siswa/about" element={<AboutSiswa />} />
        <Route path="/siswa/contact" element={<ContactSiswa />} />
        <Route path="/siswa/bank-sampah" element={<BankSampahSiswa />} />
        <Route path="/siswa/ProfileSiswa" element={<ProfileSiswa />} />
        <Route path="/siswa/printing" element={<SiswaPrintingPage />} />
        <Route path="/siswa/product/:id" element={<ProductDetailSiswaPage />} />

        {/* ===== ROOM ===== */}
        <Route path="/room/:id" element={<RoomPage />} />

        {/* ===== ADMIN DASHBOARD ===== */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="printing" element={<PrintingDashboard />} />
          <Route path="upload-item" element={<UploadItem />} />
          <Route path="orders/product" element={<AdminOrdersProduct />} />
          <Route path="orders/history" element={<AdminOrdersHistory />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ===== 404 NOT FOUND ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
