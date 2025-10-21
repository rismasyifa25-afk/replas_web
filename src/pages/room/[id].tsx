import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomDetail from "./RoomDetail";

interface RoomDetailType {
  id: string;
  status: "available" | "occupied" | "timeout";
  user?: {
    name: string;
    nisn: string;
    kelas?: string;
    jurusan?: string;
  };
  bottles?: {
    small: number;
    medium: number;
    large: number;
  };
  totalPoints?: number;
  createdAt?: string;
}

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomDetailType | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!id) return;

    setStatus("loading");

    // ✅ Mode TESTING (pakai dummy data)
    setTimeout(() => {
      const dummyData: RoomDetailType = {
        id,
        status: "occupied",
        user: {
          name: "Syifa Risma",
          nisn: "1234567890",
          kelas: "XI RPL 2",
          jurusan: "Rekayasa Perangkat Lunak",
        },
        bottles: { small: 3, medium: 1, large: 0 },
        totalPoints: 120,
        createdAt: "2025-10-17T10:00:00Z",
      };

      setRoom(dummyData);
      setStatus("success");
    }, 1000);

    // ❌ Kalau nanti backend aktif, tinggal ubah ke ini:
    /*
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/room/${id}`);
        if (!res.ok) throw new Error("Gagal fetch data");
        const data = await res.json();
        setRoom(data);
        setStatus("success");
      } catch (err) {
        console.error("Fetch failed:", err);
        setStatus("error");
      }
    };
    fetchRoom();
    */
  }, [id]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;
  if (status === "error") return <p className="text-center text-red-500 mt-10">Gagal memuat data 😢</p>;
  if (!room) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RoomDetail room={room} />
    </div>
  );
}
