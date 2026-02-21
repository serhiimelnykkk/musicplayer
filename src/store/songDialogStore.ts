import { create } from "zustand";

interface State {
  isOpen: boolean;
  songId: string | null;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setSongId: (songId: string) => void;
}

export const useSongDialog = create<State & Actions>((set) => ({
  isOpen: false,
  songId: null,
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
  setSongId: (songId) => set(() => ({ songId: songId })),
}));
