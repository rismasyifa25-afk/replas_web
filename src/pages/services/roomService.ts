export interface RoomDetail {
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

export const roomService = {
  async checkStatus(roomId: string): Promise<RoomDetail> {
    const response = await fetch(`http://localhost:8080/api/room/${roomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to check room status");
    return await response.json();
  },

  async joinRoom(
    roomId: string,
    nisn: string,
    password: string
  ): Promise<RoomDetail> {
    const response = await fetch(
      `http://localhost:8080/api/room/${roomId}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nisn, password }),
      }
    );

    if (!response.ok) throw new Error("Failed to join room");
    return await response.json();
  },

  async leaveRoom(roomId: string): Promise<void> {
    const response = await fetch(
      `http://localhost:8080/api/room/${roomId}/leave`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("Failed to leave room");
  },

  async finishRoom(roomId: string): Promise<void> {
    const response = await fetch(
      `http://localhost:8080/api/room/${roomId}/finish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("Failed to finish room");
  },
};
