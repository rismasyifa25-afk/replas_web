import React, { useState } from "react";
import Footer from "@/components/layouts/FooterSiswa";
import Navbar from "@/components/layouts/SiswaNavbar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  SquareUser,
  User,
  Printer,
  Store,
  SquarePen,
  Recycle,
  Wallet,
  X,
} from "lucide-react";

const IconCircle = ({ children }) => (
  <div
    className="rounded-xl p-2 inline-flex items-center justify-center"
    style={{ backgroundColor: "var(--bg-circle)" }}
  >
    {children}
  </div>
);

function ProfileSiswa() {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSaldoModal, setShowSaldoModal] = useState(false);

  const historyBotol = [
    { tanggal: "02 Okt 2025", jumlah: 5 },
    { tanggal: "04 Okt 2025", jumlah: 8 },
    { tanggal: "07 Okt 2025", jumlah: 12 },
  ];

  const historySaldo = [
    { tanggal: "02 Okt 2025", keterangan: "Setoran 5 botol", nominal: "+Rp 5.000" },
    { tanggal: "04 Okt 2025", keterangan: "Setoran 8 botol", nominal: "+Rp 8.000" },
    { tanggal: "06 Okt 2025", keterangan: "Pembelian emblem", nominal: "-Rp 4.000" },
  ];

  return (
    <>
      <Navbar />

      <div className="w-full h-fit md:h-screen flex justify-center items-center py-5 px-4 md:px-0 lg:-mt-12 relative z-0">
        <div
          className="w-full h-fit md:w-4/5 lg:w-3/5 xl:w-2/4 border rounded-lg flex flex-col md:flex-row shadow-lg"
          style={{ borderColor: "var(--primary)", backgroundColor: "var(--card)" }}
        >
          {/* BAGIAN KIRI - PROFIL */}
          <div
            className="w-full md:w-2/4 flex flex-col justify-center p-5 rounded-t-lg md:rounded-l-lg md:rounded-tr-none text-white"
            style={{
              background:
                "linear-gradient(to bottom, var(--gradient-card), var(--gradient-card-second))",
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="rounded-full mb-4 border-2 w-32 h-32 overflow-hidden"
                style={{ borderColor: "var(--primary)" }}
              >
                <img
                  src="/user-profile.jpg"
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
                Siswa Berprestasi
              </h1>
              <p className="text-xl font-medium" style={{ color: "var(--text-color)" }}>
                @Username
              </p>
            </div>

            <div className="w-full text-left flex flex-col font-medium mt-4">
              <div className="flex items-center gap-3 text-lg mt-3">
                <IconCircle>
                  <Mail color="#CD242C" size={22} />
                </IconCircle>
                <span style={{ color: "var(--text-color)" }}>example@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-lg mt-3">
                <IconCircle>
                  <User color="#CD242C" size={22} />
                </IconCircle>
                <span style={{ color: "var(--text-color)" }}>Siswa Berprestasi</span>
              </div>

              <div className="flex items-center gap-3 text-lg mt-3">
                <IconCircle>
                  <Phone color="#CD242C" size={22} />
                </IconCircle>
                <span style={{ color: "var(--text-color)" }}>+62 812-3456-7890</span>
              </div>

              <div className="flex items-center gap-3 text-lg mt-3">
                <IconCircle>
                  <SquareUser color="#CD242C" size={22} />
                </IconCircle>
                <span
                  style={{
                    color: "var(--text-color)",
                    backgroundColor: "var(--bg-circle)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "0.125rem",
                    fontWeight: 600,
                  }}
                >
                  SISWA
                </span>
              </div>

              <Button
                variant="default"
                className="rounded-sm mt-5 flex items-center gap-2"
                style={{ alignSelf: "flex-start" }}
              >
                <SquarePen />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* BAGIAN KANAN - INFORMASI */}
          <div
            className="w-full flex flex-col p-4 justify-center rounded-b-lg md:rounded-b-none md:rounded-r-lg"
            style={{ backgroundColor: "var(--card)", color: "var(--text-color)" }}
          >
            <h1 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
              Your Information
            </h1>
            <hr className="w-full my-2" style={{ borderColor: "var(--placeholder)" }} />

            {/* Statistik */}
            <div className="w-full gap-3 flex flex-col sm:flex-row">
              <div
                onClick={() => setShowHistoryModal(true)}
                className="w-full sm:w-1/2 cursor-pointer h-fit flex items-center rounded-lg gap-3 p-3 transition"
                style={{
                  border: "1px solid var(--primary)",
                  backgroundColor: "var(--card)",
                }}
              >
                <div style={{ backgroundColor: "var(--bg-circle)" }} className="rounded-lg p-2">
                  <Recycle color="#CD242C" size={36} />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-color)" }}>
                    History Botol
                  </h2>
                  <p className="font-semibold" style={{ color: "var(--text-color)" }}>
                    25 Botol
                  </p>
                </div>
              </div>

              <div
                onClick={() => setShowSaldoModal(true)}
                className="w-full sm:w-1/2 cursor-pointer h-fit flex items-center rounded-lg gap-3 p-3 transition"
                style={{
                  border: "1px solid var(--primary)",
                  backgroundColor: "var(--card)",
                }}
              >
                <div style={{ backgroundColor: "var(--bg-circle)" }} className="rounded-lg p-2">
                  <Wallet color="#CD242C" size={36} />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-color)" }}>
                    Saldo
                  </h2>
                  <p className="font-semibold" style={{ color: "var(--text-color)" }}>
                    Rp 75.000
                  </p>
                </div>
              </div>
            </div>

            {/* History Print */}
            <div className="w-full gap-2 flex flex-col sm:flex-row mt-4">
              <div
                className="w-full sm:w-1/2 h-fit flex items-center rounded-lg gap-3 p-3 transition"
                style={{
                  border: "1px solid var(--primary)",
                  backgroundColor: "var(--card)",
                }}
              >
                <div style={{ backgroundColor: "var(--bg-circle)" }} className="rounded-lg p-2">
                  <Printer color="#CD242C" size={36} />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--text-color)" }}>
                    History Print
                  </h2>
                  <p className="font-semibold" style={{ color: "var(--text-color)" }}>
                    10 Barang
                  </p>
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-semibold mt-6" style={{ color: "var(--text-color)" }}>
              Quick Actions
            </h1>
            <hr className="w-full my-2" style={{ borderColor: "var(--placeholder)" }} />
            <div className="w-full flex gap-2">
              <div
                className="w-1/2 flex flex-col justify-center items-center text-center py-2 cursor-pointer transition"
                style={{ border: "1px solid var(--primary)" }}
              >
                <Store color="var(--primary)" size={36} />
                <h3 style={{ color: "var(--text-color)" }}>Store</h3>
              </div>
              <div
                className="w-1/2 flex flex-col justify-center items-center text-center py-2 cursor-pointer transition"
                style={{ border: "1px solid var(--primary)" }}
              >
                <Printer color="var(--primary)" size={36} />
                <h3 style={{ color: "var(--text-color)" }}>Printing</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL HISTORY BOTOL */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowHistoryModal(false)}
          />
          <div
            className="relative rounded-lg p-6 shadow-xl"
            style={{
              width: "min(92%, 640px)",
              backgroundColor: "var(--card)",
              color: "var(--text-color)",
              border: "1px solid var(--primary)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: "var(--primary)" }}>
                Riwayat Setoran Botol
              </h2>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="rounded p-1"
                style={{ backgroundColor: "transparent" }}
              >
                <X size={20} color="var(--text-color)" />
              </button>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--placeholder)" }}>
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {historyBotol.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--placeholder)" }}>
                    <td className="py-2">{item.tanggal}</td>
                    <td className="py-2">{item.jumlah} botol</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setShowHistoryModal(false)}
                variant="default"
                className="px-6 py-2 rounded"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                }}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SALDO */}
      {showSaldoModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowSaldoModal(false)}
          />
          <div
            className="relative rounded-lg p-6 shadow-xl"
            style={{
              width: "min(92%, 640px)",
              backgroundColor: "var(--card)",
              color: "var(--text-color)",
              border: "1px solid var(--primary)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: "var(--primary)" }}>
                Riwayat Saldo
              </h2>
              <button
                onClick={() => setShowSaldoModal(false)}
                className="rounded p-1"
                style={{ backgroundColor: "transparent" }}
              >
                <X size={20} color="var(--text-color)" />
              </button>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--placeholder)" }}>
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Keterangan</th>
                  <th className="py-2 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {historySaldo.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--placeholder)" }}>
                    <td className="py-2">{item.tanggal}</td>
                    <td className="py-2">{item.keterangan}</td>
                    <td className="py-2 text-right">{item.nominal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setShowSaldoModal(false)}
                variant="default"
                className="px-6 py-2 rounded"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                }}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProfileSiswa;
