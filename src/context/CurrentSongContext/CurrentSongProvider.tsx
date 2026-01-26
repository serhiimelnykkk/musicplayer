import { CurrentSongContext } from "@/context/CurrentSongContext/CurrentSongContext";
import { type Song } from "@/types";
import React, { useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const CurrentSongProvider = ({ children }: Props) => {
  const [currentSongId, setCurrentSongId] = useState<Song["id"]>("");

  const value = useMemo(() => {
    return { currentSongId, setCurrentSongId };
  }, [currentSongId]);

  return <CurrentSongContext value={value}>{children}</CurrentSongContext>;
};
