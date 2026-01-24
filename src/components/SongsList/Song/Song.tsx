import { type Song as SongType } from "@/types";

interface Props {
  song: SongType;
}

export const Song = ({ song }: Props) => {
  const minutes = Math.floor(song.duration / 60);
  const seconds = Math.floor(song.duration % 60);
  const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

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
