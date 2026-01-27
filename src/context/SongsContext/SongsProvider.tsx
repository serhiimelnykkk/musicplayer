import { SongsContext } from "@/context/SongsContext/SongsContext";
import { type Song } from "@/types";
import React, { useMemo, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const url = "http://localhost:3000/songs";

export const SongsProvider = ({ children }: Props) => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  const value = useMemo(() => {
    return { songs, setSongs };
  }, [songs]);

  return <SongsContext value={value}>{children}</SongsContext>;
};
