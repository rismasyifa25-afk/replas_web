import React, { useState, useEffect } from "react";

interface PurchaseHistory {
  id: string;
  studentName: string;
  productName: string;
  quantity: number;
  totalPoints: number;
  date: string;
}

const dummyHistory: PurchaseHistory[] = [
  {
    id: "1",
    studentName: "Ahmad",
    productName: "LKS",
    quantity: 2,
    totalPoints: 28000,
    date: "2025-10-20",
  },
  {
    id: "2",
    studentName: "Siti",
    productName: "Badge",
    quantity: 1,
    totalPoints: 4000,
    date: "2025-10-19",
  },
  {
    id: "3",
    studentName: "Budi",
    productName: "Topi",
    quantity: 3,
    totalPoints: 60000,
    date: "2025-10-18",
  },
];

const AdminOrdersHistory: React.FC = () => {
  const [history, setHistory] = useState<PurchaseHistory[]>([]);

  useEffect(() => {
    // nanti bisa diganti dengan fetch API
    setHistory(dummyHistory);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monitoring History Pembelian Siswa</h1>
      <p className="mb-6">Daftar riwayat pembelian produk oleh siswa.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nama Siswa</th>
              <th className="border px-4 py-2">Produk</th>
              <th className="border px-4 py-2">Qty</th>
              <th className="border px-4 py-2">Total Poin</th>
              <th className="border px-4 py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.studentName}</td>
                <td className="border px-4 py-2">{item.productName}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.totalPoints.toLocaleString()}</td>
                <td className="border px-4 py-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersHistory;
