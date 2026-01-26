import { useEffect, useRef, useState } from "react";
import { Song } from "@/components/SongsList/Song/Song";
import { type Song as SongType } from "@/types";
import { Howl } from "howler";

const url = "http://localhost:3000/songs";

export const SongsList = () => {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [currentSongId, setCurrentSongId] = useState<SongType["id"]>("");
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    if (currentSongId === "") return;

    const songPath = songs.filter((song) => song.id === currentSongId)[0]
      .filePath;

    const howl = new Howl({ src: songPath, html5: true });
    howlRef.current = howl;

    howl.once("load", () => {
      howl.play();
    });

    howl.on("end", () => {
      setCurrentSongId("");
    });

    return () => {
      howl.unload();
    };
  }, [currentSongId, songs]);

  return (
    <ul className="list-none">
      {songs.map((song) => (
        <Song
          key={song.id}
          song={song}
          isActive={song.id === currentSongId}
          howlRef={howlRef}
          setCurrentSongId={setCurrentSongId}
        />
      ))}
    </ul>
  );
};
