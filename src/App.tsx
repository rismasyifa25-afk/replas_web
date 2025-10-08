import { createRoot } from 'react-dom/client'
import './assets/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import { ThemeProvider } from "@/components/theme-provider"
import Index from './pages'
import Dashboard from './pages/dashboard'
import ServicePage from './pages/services'
import ContactPage from './pages/contact'
import ProductPage from './pages/store'
import AboutPage from './pages/aboutUs'
import UserEdit from "./pages/profile/userEdit";
import HistoryPage from "./pages/profile/history";
import ProductDetailPage from './pages/product'
import PrintingDashboard from './pages/dashboard/printing'
import UploadItem from './pages/dashboard/uploadItem'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/service' element={<ServicePage />} />
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/store' element={<ProductPage/>}/>
        <Route path="/product/:id" element={<ProductDetailPage />}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path="/history" element={<HistoryPage />} />

        <Route path="/useredit" element={<UserEdit />} />

        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="printing" element={<PrintingDashboard />} />
          <Route path="upload-item" element={<UploadItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
