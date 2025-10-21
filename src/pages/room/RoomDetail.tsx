import React from "react";

interface Props {
  room: {
    id: string;
    status: string;
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
  };
}

export default function RoomDetail({ room }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Detail Transaksi Room #{room.id}
      </h2>

      <p><strong>Status:</strong> {room.status}</p>
      {room.user && (
        <div className="mt-3">
          <p><strong>Nama:</strong> {room.user.name}</p>
          <p><strong>NISN:</strong> {room.user.nisn}</p>
          <p><strong>Kelas:</strong> {room.user.kelas}</p>
          <p><strong>Jurusan:</strong> {room.user.jurusan}</p>
        </div>
      )}

      {room.bottles && (
        <div className="mt-3">
          <p><strong>Botol kecil:</strong> {room.bottles.small}</p>
          <p><strong>Botol sedang:</strong> {room.bottles.medium}</p>
          <p><strong>Botol besar:</strong> {room.bottles.large}</p>
        </div>
      )}

      <p className="mt-3"><strong>Total Poin:</strong> {room.totalPoints}</p>
      <p className="mt-1 text-sm text-gray-500">
        Dibuat pada: {new Date(room.createdAt || "").toLocaleString()}
      </p>
    </div>
  );
}
