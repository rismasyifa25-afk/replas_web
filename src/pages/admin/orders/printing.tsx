import React, { useState, useEffect } from "react";

interface PrintingOrder {
  id: string;
  studentName: string;
  serviceName: string;
  quantity: number;
  totalPoints: number;
  status: string;
  date: string;
}

const dummyPrintingOrders: PrintingOrder[] = [
  {
    id: "1",
    studentName: "Ahmad",
    serviceName: "Print LKS",
    quantity: 2,
    totalPoints: 10000,
    status: "Pending",
    date: "2025-10-20",
  },
  {
    id: "2",
    studentName: "Siti",
    serviceName: "Print Poster",
    quantity: 1,
    totalPoints: 5000,
    status: "Completed",
    date: "2025-10-19",
  },
  {
    id: "3",
    studentName: "Budi",
    serviceName: "Print Banner",
    quantity: 3,
    totalPoints: 15000,
    status: "Pending",
    date: "2025-10-18",
  },
];

const AdminOrdersPrinting: React.FC = () => {
  const [orders, setOrders] = useState<PrintingOrder[]>([]);

  useEffect(() => {
    // Bisa diganti dengan fetch API nanti
    setOrders(dummyPrintingOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Monitoring Jasa Printing Siswa</h1>
      <p className="mb-6">Daftar pesanan jasa printing oleh siswa.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nama Siswa</th>
              <th className="border px-4 py-2">Jasa</th>
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
                <td className="border px-4 py-2">{order.serviceName}</td>
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

export default AdminOrdersPrinting;
