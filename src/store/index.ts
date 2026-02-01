import { create } from "zustand";

interface State {
  currentSongId: string | null;
  duration: number;
  currentPos: number;
  isPlaying: boolean;
  volume: number;
}

interface Actions {
  setState(update: Partial<State>): void;
}

export const useCurrentSong = create<State & Actions>((set) => ({
  currentSongId: null,
  duration: 0,
  currentPos: 0,
  isPlaying: false,
  volume: 0.5,

  setState: (update) => set((state) => ({ ...state, ...update })),
}));
