import { createContext, useContext } from "react";

interface ContextValue {
  currentSongId: string;
  setCurrentSongId: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrentSongContext = createContext<ContextValue | null>(null);
export const useCurrentSong = () => {
  const ctx = useContext(CurrentSongContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
