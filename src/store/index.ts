import type { Song } from "@/types";
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
  nextSong(songs: Song[]): void;
}

export const useCurrentSong = create<State & Actions>((set) => ({
  currentSongId: null,
  duration: 0,
  currentPos: 0,
  isPlaying: false,
  volume: 0.5,

  nextSong: (songs) =>
    set((state) => {
      const currentSong = songs.find((song) => song.id === state.currentSongId);

      if (currentSong) {
        const currentSongIndex = songs.indexOf(currentSong);
        let nextSong = null;
        if (currentSongIndex === songs.length - 1) {
          nextSong = songs[0];
        } else {
          nextSong = songs[currentSongIndex + 1];
        }
        return { ...state, currentSongId: nextSong.id };
      }
      return state;
    }),
  setState: (update) => set((state) => ({ ...state, ...update })),
}));
