import React from "react";

import { Button } from "@/components/ui/button";
import { Mail, Phone, Shield, User } from "lucide-react";

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-xl p-2 inline-flex items-center justify-center"
    style={{ backgroundColor: "var(--bg-circle)" }}
  >
    {children}
  </div>
);

function AdminProfile() {
  return (
    <>
      <div className="w-full flex justify-center items-center py-8 px-4">
        <div
          className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 border rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6"
          style={{ borderColor: "var(--primary)", backgroundColor: "var(--card)" }}
        >
          {/* FOTO PROFIL */}
          <div className="flex flex-col items-center md:w-2/5">
            <div
              className="rounded-full mb-4 border-2 w-32 h-32 overflow-hidden"
              style={{ borderColor: "var(--primary)" }}
            >
              <img
                src="/admin-profile.jpg"
                alt="Admin Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>
              Admin Sekolah
            </h1>
            <p className="text-base font-medium" style={{ color: "var(--text-color)" }}>
              @AdminUtama
            </p>
          </div>

          {/* INFORMASI PROFIL */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-color)" }}>
              Informasi Admin
            </h2>
            <hr className="mb-4" style={{ borderColor: "var(--placeholder)" }} />

            <div className="flex items-center gap-3 mb-3">
              <IconCircle>
                <Mail color="#CD242C" size={22} />
              </IconCircle>
              <span style={{ color: "var(--text-color)" }}>admin@sekolah.id</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <IconCircle>
                <Phone color="#CD242C" size={22} />
              </IconCircle>
              <span style={{ color: "var(--text-color)" }}>+62 812-5555-1234</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <IconCircle>
                <Shield color="#CD242C" size={22} />
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
                ADMIN
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <IconCircle>
                <User color="#CD242C" size={22} />
              </IconCircle>
              <span style={{ color: "var(--text-color)" }}>Nama Lengkap Admin</span>
            </div>

            <Button
              variant="default"
              className="rounded-sm mt-4 w-fit flex items-center gap-2"
              style={{
                backgroundColor: "var(--primary)",
                color: "#fff",
              }}
            >
              Edit Profil
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
