import type { Playlist } from "@/types";
import { create } from "zustand";

interface State {
  isOpen: boolean;
  songId: string | null;
  checkedPlaylistIds: Playlist["id"][];
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setSongId: (songId: string) => void;
  setChecked: (checked: boolean, playlistId: Playlist["id"]) => void;
}

export const useSongDialog = create<State & Actions>((set) => ({
  isOpen: false,
  songId: null,
  checkedPlaylistIds: [],
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
  setSongId: (songId) => set(() => ({ songId: songId })),
  setChecked: (checked, playlistId) =>
    set((state) => {
      if (checked) {
        return {
          ...state,
          checkedPlaylistIds: [...state.checkedPlaylistIds, playlistId],
        };
      } else {
        return {
          ...state,
          checkedPlaylistIds: state.checkedPlaylistIds.filter(
            (id) => id !== playlistId,
          ),
        };
      }
    }),
}));
