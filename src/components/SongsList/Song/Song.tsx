import { type Song as SongType } from "@/types";
import { Play } from "lucide-react";

interface Props {
  song: SongType;
}

export const Song = ({ song }: Props) => {
  const minutes = Math.floor(song.duration / 60);
  const seconds = Math.floor(song.duration % 60);
  const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <li className="flex group font-semibold gap-4 p-4 bg-neutral-900 text-neutral-100 border-b border-neutral-700">
      <div className="size-16">
        <button className="relative">
          <img
            src={song.albumCover}
            alt={`${song.title}'s album cover`}
            width={64}
            height={64}
            className="object-cover rounded-sm"
            loading="lazy"
          />
          <Play className="absolute top-[50%] left-[50%] -translate-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-1 items-center">
        <div className="flex flex-col self-stretch">
          <span className="text-lg flex-1 font-bold overflow-hidden whitespace-nowrap text-ellipsis">
            {song.title}
          </span>
          <span className="text-sm text-neutral-500">{song.artist}</span>
        </div>

        <span>{song.albumName}</span>
        <span>{song.genre}</span>
        <span className="justify-self-end">{duration}</span>
      </div>
    </li>
  );
};
