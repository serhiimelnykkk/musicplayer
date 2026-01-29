import { createContext, useContext } from "react";

interface ContextValue {
  currentPos: number[];
  setCurrentPos: React.Dispatch<React.SetStateAction<number[]>>;
}

export const SeekContext = createContext<ContextValue | null>(null);
export const useSeek = () => {
  const ctx = useContext(SeekContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
