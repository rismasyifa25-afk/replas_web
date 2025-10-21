import React, { useState, useEffect } from "react";

interface Order {
  id: string;
  studentName: string;
  productName: string;
  quantity: number;
  totalPoints: number;
  status: string;
  date: string;
}

const dummyOrders: Order[] = [
  {
    id: "1",
    studentName: "Ahmad",
    productName: "Emblem",
    quantity: 2,
    totalPoints: 34000,
    status: "Pending",
    date: "2025-10-20",
  },
  {
    id: "2",
    studentName: "Siti",
    productName: "LKS Agama",
    quantity: 1,
    totalPoints: 22000,
    status: "Completed",
    date: "2025-10-19",
  },
  {
    id: "3",
    studentName: "Budi",
    productName: "Topi",
    quantity: 3,
    totalPoints: 60000,
    status: "Pending",
    date: "2025-10-18",
  },
];

const MonitoringOrdersSiswa: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Di sini bisa diganti dengan fetch API jika sudah ada backend
    setOrders(dummyOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monitoring List Pesanan Siswa (Product)</h1>
      <p className="mb-6">Daftar pesanan siswa untuk produk.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nama Siswa</th>
              <th className="border px-4 py-2">Produk</th>
              <th className="border px-4 py-2">Qty</th>
              <th className="border px-4 py-2">Total Poin</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.studentName}</td>
                <td className="border px-4 py-2">{order.productName}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">{order.totalPoints.toLocaleString()}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoringOrdersSiswa;
