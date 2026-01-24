import { type Song as SongType } from "@/types";
import { Howl } from "howler";
import { useState } from "react";

interface Props {
  song: SongType;
}

export const Song = ({ song }: Props) => {
  const [duration, setDuration] = useState(0);

  const howl = new Howl({
    src: `${song.filePath}`,
  });

  howl.on("load", () => setDuration(howl.duration()));

  return (
    <div>
      <img src={song.albumCover} alt={`${song.title}'s album cover`} />
      <span>{song.title}</span>
      <span>{song.artist}</span>
      <span>{song.albumName}</span>
      <span>{song.genre}</span>
      <span>{duration}</span>
    </div>
  );
};
