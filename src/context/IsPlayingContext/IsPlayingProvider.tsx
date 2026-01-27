import { IsPlayingContext } from "@/context/IsPlayingContext/IsPlayingContext";
import { useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const IsPlayingProvider = ({ children }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const value = useMemo(() => {
    return { isPlaying, setIsPlaying };
  }, [isPlaying]);

  return <IsPlayingContext value={value}>{children}</IsPlayingContext>;
};
