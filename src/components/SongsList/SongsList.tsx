import { useEffect, useState } from "react";
import { Song } from "@/components/SongsList/Song/Song";
import { type Song as SongType } from "@/types";

const url = "http://localhost:3000/songs";

export const SongsList = () => {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [playingSong, setPlayingSong] = useState<SongType["id"]>("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <ul className="list-none">
      {songs.map((song) => (
        <Song
          key={song.id}
          song={song}
          isPlaying={song.id === playingSong}
          setPlayingSong={setPlayingSong}
        />
      ))}
      =
    </ul>
  );
};
