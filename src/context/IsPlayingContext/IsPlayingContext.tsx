import { createContext, useContext } from "react";

interface ContextValue {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsPlayingContext = createContext<ContextValue | null>(null);
export const useIsPlaying = () => {
  const ctx = useContext(IsPlayingContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
