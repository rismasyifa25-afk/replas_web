import { useState, useEffect } from "react";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";
import Footer from "@/components/layouts/FooterSiswa";
import { Fetch } from "@/lib/fetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SiswaPrintingPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [costPerPage] = useState<number>(100); // Poin per halaman
  const [totalCost, setTotalCost] = useState<number>(100);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data siswa dari cookie atau API
  useEffect(() => {
    const name = Cookies.get("studentName") || "Nama Siswa";
    const points = Number(Cookies.get("studentPoints")) || 1000;
    setStudentName(name);
    setUserPoints(points);

    // set waktu default pengambilan
    const now = new Date();
    now.setHours(now.getHours() + 1);
    setPickupTime(now.toISOString().slice(0, 16));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const estimatedPages = Math.max(1, Math.floor(file.size / 50000));
      setPageCount(estimatedPages);
      setTotalCost(estimatedPages * costPerPage);
    }
  };

  const handlePageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 1;
    setPageCount(count);
    setTotalCost(count * costPerPage);
  };

  const handlePrint = async () => {
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    if (userPoints < totalCost) {
      alert("Poin tidak cukup");
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("pageCount", pageCount.toString());
      formData.append("totalCost", totalCost.toString());
      formData.append("pickupTime", pickupTime);
      formData.append("studentName", studentName);

      await Fetch.post("/printing/order", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Pesanan cetak berhasil dibuat!");
      navigate("/siswa");
    } catch (error) {
      console.error("Print order failed:", error);
      alert("Gagal membuat pesanan cetak");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SiswaNavbar />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Layanan Cetak Siswa
          </h1>

          <div className="bg-white dark:bg-[#100C0C] border border-black dark:border-white rounded-lg p-6 shadow-md">
            {/* Nama Siswa */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Atas Nama
              </label>
              <input
                type="text"
                value={studentName}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Pilih File (PDF, DOC, DOCX)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {selectedFile && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  File: {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600">
                  Ukuran: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            {/* Jumlah Halaman */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Jumlah Halaman
              </label>
              <input
                type="number"
                min="1"
                value={pageCount}
                onChange={handlePageCountChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Jam Pengambilan */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Jam Pengambilan
              </label>
              <input
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Detail Pembayaran */}
            <div className="mb-6 border-t border-gray-300 pt-4">
              <h2 className="text-lg font-semibold mb-2">
                Detail Pembayaran
              </h2>
              <p className="text-sm text-gray-600">
                Biaya per Halaman: {costPerPage} poin
              </p>
              <p className="text-sm text-gray-600">
                Jumlah Halaman: {pageCount}
              </p>
              <p className="text-lg font-bold mt-2">
                Total Biaya: {totalCost} poin
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Poin Anda Sekarang: {userPoints}
              </p>
            </div>

            {/* Tombol Cetak */}
            <button
              onClick={handlePrint}
              disabled={loading || !selectedFile || userPoints < totalCost}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Cetak Sekarang"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
