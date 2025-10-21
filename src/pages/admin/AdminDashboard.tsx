import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusButton from "@/components/element/Button/Status";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Trophy, Home, Camera } from "lucide-react";

const chartData = [
  { date: "2024-04-01", users: 120, transactions: 50 },
  { date: "2024-04-02", users: 130, transactions: 55 },
  { date: "2024-04-03", users: 125, transactions: 60 },
  { date: "2024-04-04", users: 140, transactions: 65 },
  { date: "2024-04-05", users: 150, transactions: 70 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  transactions: {
    label: "Transactions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const transactionData = [
  { id: "001", student: "John Doe", product: "Buku Tulis", amount: "Rp50.000", status: "success" },
  { id: "002", student: "Jane Smith", product: "Pensil", amount: "Rp20.000", status: "pending" },
  { id: "003", student: "Bob Johnson", product: "Penghapus", amount: "Rp10.000", status: "success" },
];

const rankingData = [
  { rank: 1, student: "Alice", points: 1500 },
  { rank: 2, student: "Charlie", points: 1400 },
  { rank: 3, student: "Diana", points: 1300 },
];

const roomStatus = [
  { room: "Room 1", status: "digunakan" },
  { room: "Room 2", status: "kosong" },
  { room: "Room 3", status: "digunakan" },
];

const cameraStatus = [
  { camera: "Cam 1", status: "hidup" },
  { camera: "Cam 2", status: "mati" },
  { camera: "Cam 3", status: "hidup" },
];

const statusMap: Record<string, { variant: "green" | "yellow" | "red"; label: string }> = {
  success: { variant: "green", label: "Berhasil" },
  pending: { variant: "yellow", label: "Menunggu" },
  failed: { variant: "red", label: "Gagal" },
};

const roomStatusMap: Record<string, { variant: "green" | "red"; label: string }> = {
  digunakan: { variant: "red", label: "Digunakan" },
  kosong: { variant: "green", label: "Kosong" },
};

const cameraStatusMap: Record<string, { variant: "green" | "red"; label: string }> = {
  hidup: { variant: "green", label: "Hidup" },
  mati: { variant: "red", label: "Mati" },
};

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Monitoring Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="px-4 py-4 md:px-8 flex flex-col justify-center items-center h-full">
          <Users className="h-8 w-8 mb-2" />
          <h1 className="text-2xl font-bold text-[color:var(--text-product)]">150</h1>
          <p className="text-xl">Banyak User</p>
        </Card>
        <Card className="px-4 py-4 md:px-8 flex flex-col justify-center items-center h-full">
          <TrendingUp className="h-8 w-8 mb-2" />
          <h1 className="text-2xl font-bold text-[color:var(--text-product)]">75</h1>
          <p className="text-xl">Transaksi Siswa</p>
        </Card>
        <Card className="px-4 py-4 md:px-8 flex flex-col justify-center items-center h-full">
          <Trophy className="h-8 w-8 mb-2" />
          <h1 className="text-2xl font-bold text-[color:var(--text-product)]">Alice</h1>
          <p className="text-xl">Ranking Poin Terbanyak</p>
        </Card>
        <Card className="px-4 py-4 md:px-8 flex flex-col justify-center items-center h-full">
          <Home className="h-8 w-8 mb-2" />
          <h1 className="text-2xl font-bold text-[color:var(--text-product)]">2/3</h1>
          <p className="text-xl">Room Digunakan</p>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring User & Transaksi</CardTitle>
          <CardDescription>Chart untuk user dan transaksi siswa</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="users" type="natural" fill="url(#fillUsers)" stroke="var(--chart-1)" />
              <Area dataKey="transactions" type="natural" fill="url(#fillTransactions)" stroke="var(--chart-2)" />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Transaksi Siswa Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rekap Transaksi Siswa Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Siswa</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.student}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <StatusButton variant={statusMap[item.status]?.variant || "red"}>
                      {statusMap[item.status]?.label || "Gagal"}
                    </StatusButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ranking Poin */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Poin Terbanyak</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Siswa</TableHead>
                <TableHead>Poin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.student}</TableCell>
                  <TableCell>{item.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Status Room */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Status Room</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {roomStatus.map((room) => (
              <Card key={room.room} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{room.room}</h3>
                </div>
                <StatusButton variant={roomStatusMap[room.status]?.variant || "red"}>
                  {roomStatusMap[room.status]?.label || "Unknown"}
                </StatusButton>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kondisi Alat (Kamera) */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Kondisi Alat (Kamera)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cameraStatus.map((cam) => (
              <Card key={cam.camera} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  <span>{cam.camera}</span>
                </div>
                <Badge variant={cameraStatusMap[cam.status]?.variant === "green" ? "default" : "destructive"}>
                  {cameraStatusMap[cam.status]?.label || "Unknown"}
                </Badge>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
