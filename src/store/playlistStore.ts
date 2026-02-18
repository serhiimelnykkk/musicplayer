import type { Song } from "@/types";
import { create } from "zustand";

interface Playlist {
id: string;
  name: string;
  songIds: Set<Song["id"]>;
}

interface State {
  playlists: Playlist[];
}

interface Actions {
  setState(update: Partial<State>): void;
}

const initialState: State = { playlists: [] };

export const usePlaylists = create<State & Actions>((set) => ({
  ...initialState,
  setState: (update) => set((state) => ({ ...state, ...update })),
}));
