import { createContext, useContext } from "react";

type ContextValue = React.RefObject<Howl | null> | null;

export const HowlRefContext = createContext<ContextValue>(null);
export const useHowl = () => {
  const ctx = useContext(HowlRefContext);

  if (!ctx) {
    throw new Error("useContext used outside of context.");
  }

  return ctx;
};
