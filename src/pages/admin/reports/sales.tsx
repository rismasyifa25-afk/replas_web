import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, DollarSign, Package } from "lucide-react";

interface SalesReport {
  id: string;
  date: string;
  quantityKg: number;
  pricePerKg: number;
  totalRp: number;
  description?: string;
}

const salesData: SalesReport[] = [
  {
    id: "1",
    date: "2024-01-15",
    quantityKg: 25.5,
    pricePerKg: 1500,
    totalRp: 38250,
    description: "Penjualan sampah plastik PET",
  },
  {
    id: "2",
    date: "2024-01-16",
    quantityKg: 18.0,
    pricePerKg: 1400,
    totalRp: 25200,
    description: "Penjualan sampah plastik HDPE",
  },
  {
    id: "3",
    date: "2024-01-17",
    quantityKg: 32.7,
    pricePerKg: 1600,
    totalRp: 52320,
    description: "Penjualan sampah plastik campur",
  },
];

const SalesReportPage: React.FC = () => {
  const totalQuantity = salesData.reduce((sum, sale) => sum + sale.quantityKg, 0);
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalRp, 0);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Laporan Sampah Plastik</h1>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ringkasan Penjualan
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalQuantity.toFixed(1)} kg</div>
            <p className="text-sm text-gray-600">Total Sampah</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Rp {totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Pendapatan</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{salesData.length}</div>
            <p className="text-sm text-gray-600">Transaksi</p>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Laporan Penjualan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah (kg)</TableHead>
                  <TableHead>Harga/kg (Rp)</TableHead>
                  <TableHead>Total (Rp)</TableHead>
                  <TableHead>Deskripsi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(sale.date).toLocaleDateString("id-ID")}
                      </div>
                    </TableCell>
                    <TableCell>{sale.quantityKg.toFixed(1)}</TableCell>
                    <TableCell>Rp {sale.pricePerKg.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">Rp {sale.totalRp.toLocaleString()}</TableCell>
                    <TableCell>{sale.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReportPage;
