import type { Playlist, Song } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  playlists: Playlist[];
  currentPlaylistId: Playlist["id"] | null;
}

interface Actions {
  setState(update: Partial<State>): void;
  addSong: (playlistId: Playlist["id"], songId: Song["id"]) => void;
  createPlaylist: (name?: Playlist["name"]) => void;
  setCurrentPlaylistId: (id: Playlist["id"] | null) => void;
}

const initialState: State = { currentPlaylistId: null, playlists: [] };

export const usePlaylists = create<State & Actions>()(
  persist(
    (set) => ({
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
      setCurrentPlaylistId: (id) =>
        set((state) => ({ ...state, currentPlaylistId: id })),
    }),
    {
      name: "playlists",
      partialize: (state) => ({
        playlists: state.playlists.map((playlist) => ({
          ...playlist,
          songIds: Array.from(playlist.songIds),
        })),
        currentPlaylistId: state.currentPlaylistId,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as State),
        playlists: (persistedState as State).playlists.map((playlist) => ({
          ...playlist,
          songIds: new Set(playlist.songIds),
        })),
      }),
    },
  ),
);
