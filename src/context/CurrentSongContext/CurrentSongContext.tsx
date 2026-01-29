import { createContext, useContext } from "react";

interface ContextValue {
  currentSongId: string | null;
  setCurrentSongId: React.Dispatch<React.SetStateAction<string | null>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

export const CurrentSongContext = createContext<ContextValue | null>(null);
export const useCurrentSong = () => {
  const ctx = useContext(CurrentSongContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
