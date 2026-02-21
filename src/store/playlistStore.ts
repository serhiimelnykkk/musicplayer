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
  addSong: (playlistId: Playlist["id"], songId: Song["id"]) => void;
  createPlaylist: (name?: Playlist["name"]) => void;
}

const initialState: State = { playlists: [] };

export const usePlaylists = create<State & Actions>((set) => ({
  ...initialState,
  createPlaylist: (name?: Playlist["name"]) =>
    set((state) => {
      const newPlaylist: Playlist = {
        id: crypto.randomUUID(),
        name: name || "Unnamed Playlist",
        songIds: new Set(),
      };
      return { ...state, playlists: [...state.playlists, newPlaylist] };
    }),
  addSong: (playlistId: Playlist["id"], songId: Song["id"]) =>
    set((state) => {
      const updatedPlaylist = state.playlists.find(
        (playlist) => playlist.id === playlistId,
      );

      if (!updatedPlaylist) {
        return state;
      }

      updatedPlaylist.songIds.add(songId);
      const playlists = state.playlists;
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return updatedPlaylist;
        } else {
          return playlist;
        }
      });

      return { ...state, playlists: updatedPlaylists };
    }),
  setState: (update) => set((state) => ({ ...state, ...update })),
}));
