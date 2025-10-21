import { create } from "zustand";
import { roomService } from "@/pages/services/roomService";
import type { RoomDetail } from "@/pages/services/roomService"; // ✅ type-only import

interface RoomState {
  room: RoomDetail | null;
  loading: boolean;
  error: string | null;
  timeout: boolean;

  checkStatus: (id: string) => Promise<void>;
  joinRoom: (id: string, nisn: string, password: string) => Promise<void>;
  leaveRoom: (id: string) => Promise<void>;
  finishRoom: (id: string) => Promise<void>;
  setTimeout: (value: boolean) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  room: null,
  loading: false,
  error: null,
  timeout: false,

  checkStatus: async (id) => {
    set({ loading: true });
    try {
      const data = await roomService.checkStatus(id);
      set({ room: data, error: null });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      } else {
        set({ error: "Terjadi kesalahan tak dikenal" });
      }
    } finally {
      set({ loading: false });
    }
  },

  joinRoom: async (id, nisn, password) => {
    set({ loading: true });
    try {
      const data = await roomService.joinRoom(id, nisn, password);
      set({ room: data, error: null });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      } else {
        set({ error: "Terjadi kesalahan tak dikenal" });
      }
    } finally {
      set({ loading: false });
    }
  },

  leaveRoom: async (id) => {
    await roomService.leaveRoom(id);
    set({ room: null });
  },

  finishRoom: async (id) => {
    await roomService.finishRoom(id);
    set({ room: null });
  },

  setTimeout: (value) => set({ timeout: value }),
}));
