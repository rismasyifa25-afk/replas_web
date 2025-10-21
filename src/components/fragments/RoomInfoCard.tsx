import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RoomDetail } from "@/pages/services/roomService"; // 👈 gunakan type-only import

interface RoomInfoCardProps {
  room: RoomDetail;
  onFinish: () => void;
  onCancel: () => void;
}

export default function RoomInfoCard({ room, onFinish, onCancel }: RoomInfoCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-md border border-gray-200">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">📦 Detail Transaksi</h2>
      </CardHeader>

      <CardContent>
        <p><strong>Nama:</strong> {room.user?.name}</p>
        <p><strong>NISN:</strong> {room.user?.nisn}</p>
        <p><strong>Status:</strong> {room.status}</p>

        <div className="mt-3">
          <p><strong>Botol kecil:</strong> {room.bottles?.small ?? 0}</p>
          <p><strong>Botol sedang:</strong> {room.bottles?.medium ?? 0}</p>
          <p><strong>Botol besar:</strong> {room.bottles?.large ?? 0}</p>
        </div>

        <div className="mt-3">
          <p><strong>Total Poin:</strong> {room.totalPoints ?? 0}</p>
          <p><strong>Waktu:</strong> {new Date(room.createdAt ?? "").toLocaleTimeString()}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between mt-4">
        <Button variant="destructive" onClick={onCancel}>Cancel</Button>
        <Button variant="default" onClick={onFinish}>Selesai</Button>
      </CardFooter>
    </Card>
  );
}
