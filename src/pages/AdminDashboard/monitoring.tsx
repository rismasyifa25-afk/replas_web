import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Users } from "lucide-react";

interface Room {
  id: string;
  name: string;
  status: "used" | "empty";
  details?: string;
}

interface Camera {
  id: string;
  name: string;
  status: "on" | "off";
}

const MonitoringPage: React.FC = () => {
  const rooms: Room[] = [
    { id: "1", name: "Room A", status: "used", details: "Occupied by Student Group 1" },
    { id: "2", name: "Room B", status: "empty" },
    { id: "3", name: "Room C", status: "used", details: "Occupied by Student Group 2" },
  ];

  const [cameras, setCameras] = useState<Camera[]>([
    { id: "1", name: "Camera 1", status: "on" },
    { id: "2", name: "Camera 2", status: "off" },
    { id: "3", name: "Camera 3", status: "on" },
  ]);

  const toggleCameraStatus = (id: string) => {
    setCameras(prev =>
      prev.map(cam =>
        cam.id === id ? { ...cam, status: cam.status === "on" ? "off" : "on" } : cam
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Monitoring Alat (Room + Cam)</h1>

      {/* Room Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Management Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div key={room.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{room.name}</h3>
                  <Badge variant={room.status === "used" ? "default" : "secondary"}>
                    {room.status === "used" ? "Di Gunakan" : "Kosong"}
                  </Badge>
                </div>
                {room.status === "used" && room.details && (
                  <p className="text-sm text-gray-600">{room.details}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Camera Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Kondisi Cam
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cameras.map((camera) => (
              <div key={camera.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{camera.name}</h3>
                  <Badge variant={camera.status === "on" ? "default" : "destructive"}>
                    {camera.status === "on" ? "Hidup" : "Mati"}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => toggleCameraStatus(camera.id)}
                  variant={camera.status === "on" ? "destructive" : "default"}
                >
                  {camera.status === "on" ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Matikan
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      Hidupkan
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringPage;
