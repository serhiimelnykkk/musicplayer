import { SongsContext } from "@/context/SongsContext/SongsContext";
import { type Song } from "@/types";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const url = "/db.json";

type ResponseType = {
  songs: Song[];
};

export const SongsProvider = ({ children }: Props) => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: ResponseType) => setSongs(data.songs));
  }, []);

  const value = useMemo(() => {
    return { songs, setSongs };
  }, [songs]);

  return <SongsContext value={value}>{children}</SongsContext>;
};
