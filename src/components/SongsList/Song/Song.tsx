import { PlayButton } from "@/components/SongsList/Song/PlayButton";
import { useCurrentSong } from "@/store/currentSongStore";
import { useSongDialog } from "@/store/songDialogStore";
import { type Song as SongType } from "@/types";
import { durationToViewString } from "@/util";
import { PlusCircle } from "lucide-react";
import { memo } from "react";

interface Props {
  song: SongType;
}

export const Song = memo(({ song }: Props) => {
  const isActive = useCurrentSong((state) => state.currentSongId === song.id);

  const duration = durationToViewString(song.duration);

  const handleAddToPlaylistClick = () => {
    useSongDialog.getState().setSongId(song.id);
    useSongDialog.getState().setIsOpen(true);
  };

  return (
    <li
      className={`flex group font-semibold gap-4 p-4 bg-neutral-900 text-neutral-100 border-b border-neutral-700 items-center`}
    >
      <PlayButton song={song} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 items-center text-sm">
        <div className="flex flex-col self-stretch">
          <span
            className={`${isActive ? "text-green-500" : "group-hover:text-teal-500"} text-base transition-colors duration-200 flex-1 font-bold overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {song.title}
          </span>
          <span className="text-sm text-neutral-500 overflow-hidden whitespace-nowrap text-ellipsis">
            {song.artist}
          </span>
        </div>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis hidden lg:block">
          {song.albumName}
        </span>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis hidden lg:block">
          {song.genre}
        </span>
        <div className="justify-self-end flex items-center gap-4 overflow-hidden whitespace-nowrap text-ellipsis">
          <span>{duration}</span>
          <button
            onClick={() => handleAddToPlaylistClick()}
            className="hover:text-green-600 transition-colors duration-200"
          >
            <PlusCircle />
          </button>
        </div>
      </div>
    </li>
  );
});
