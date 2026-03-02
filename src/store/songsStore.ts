import type { Song } from "@/types";
import { create } from "zustand";

interface State {
  songs: Song[];
}

interface Actions {
  setSongs: (songs: Song[]) => void;
}

export const useSongs = create<State & Actions>((set) => ({
  songs: [],
  setSongs: (songs) => set((state) => ({ ...state, songs: songs })),
}));
