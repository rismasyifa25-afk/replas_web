import { createRoot } from 'react-dom/client'
import './assets/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"

// ===== Pages =====
import Index from './pages' // Home utama
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import Dashboard from './pages/dashboard'
import ServicePage from './pages/services'
import ContactPage from './pages/contact'
import ProductPage from './pages/store'
import AboutPage from './pages/aboutUs'
import UserEdit from "./pages/profile/userEdit"
import HistoryPage from "./pages/profile/history"
import ProductDetailPage from './pages/product'
import PrintingDashboard from './pages/dashboard/printing'
import UploadItem from './pages/dashboard/uploadItem'
import BankSampah from './pages/BankSampah'
import ReceiptPage from './pages/receipt'

// ===== Siswa =====
import SiswaPage from './pages/siswa'
import SiswaPrintingPage from './pages/siswa/printing'
import AboutSiswa from './pages/siswa/AboutSiswa'
import ContactSiswa from './pages/siswa/ContactSiswa'
import ProfileSiswa from './pages/siswa/ProfileSiswa'
import BankSampahSiswa from './pages/siswa/bank-sampah'

// ===== Admin =====
import AdminLayout from './pages/admin/layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProduct from './pages/admin/Product'
import AdminUsers from './pages/admin/users'
import AdminOrdersProduct from './pages/admin/orders/product'
import AdminOrdersPrinting from './pages/admin/orders/printing'
import AdminOrdersHistory from './pages/admin/orders/history'
import MonitoringPage from './pages/admin/reports/monitoring'
import SalesReportPage from './pages/admin/reports/sales'
import ProductDetailSiswaPage from './pages/siswa/ProductDetailSiswaPage'
import StoreSiswa from './pages/siswa/StoreSiswa'
import RoomPage from './pages/room/[id]'
import AdminLogin from './pages/admin/AdminLogin'
import AdminProfile from './pages/admin/profile'

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



        {/* ===== DASHBOARD (USER/PRINTING) ===== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/printing" element={<PrintingDashboard />} />
        <Route path="/dashboard/upload-item" element={<UploadItem />} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="orders/product" element={<AdminOrdersProduct />} />
          <Route path="orders/printing" element={<AdminOrdersPrinting />} />
          <Route path="orders/history" element={<AdminOrdersHistory />} />
          <Route path="reports/monitoring" element={<MonitoringPage />} />
          <Route path="reports/sales" element={<SalesReportPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
