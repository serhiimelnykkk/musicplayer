import { createContext, useContext } from "react";
import { type Song } from "@/types";

interface ContextValue {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

export const SongsContext = createContext<ContextValue | null>(null);
export const useSongs = () => {
  const ctx = useContext(SongsContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
