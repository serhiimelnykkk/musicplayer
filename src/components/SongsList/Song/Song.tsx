import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useCurrentSong } from "@/store/currentSongStore";
import { useSongDialog } from "@/store/songDialogStore";
import { type Song as SongType } from "@/types";
import { durationToViewString } from "@/util";
import { Pause, Play, PlusCircle } from "lucide-react";
import { memo } from "react";
import { useShallow } from "zustand/shallow";

interface Props {
  song: SongType;
}

export const Song = memo(({ song }: Props) => {
  const { isActive, isPlaying, setState } = useCurrentSong(
    useShallow((state) => {
      const isCurrent = state.currentSongId === song.id;

      return {
        isActive: isCurrent,
        isPlaying: isCurrent ? state.isPlaying : false,
        setState: state.setState,
      };
    }),
  );

  const howlRef = useHowl();
  const duration = durationToViewString(song.duration);

  const handlePlayClick = () => {
    if (howlRef.current && isActive) {
      const playing = howlRef.current.playing();
      if (playing) {
        howlRef.current.pause();
      } else {
        howlRef.current.play();
      }
    }
    setState({ currentSongId: song.id });
  };

  const handleAddToPlaylistClick = () => {
    useSongDialog.getState().setSongId(song.id);
    useSongDialog.getState().setIsOpen(true);
  };

  return (
    <li
      className={`flex group font-semibold gap-4 p-4 bg-neutral-900 text-neutral-100 border-b border-neutral-700`}
    >
      <div className="size-16">
        <button className="relative" onClick={handlePlayClick}>
          <img
            src={song.albumCover}
            alt={`${song.title}'s album cover`}
            width={64}
            height={64}
            className="object-cover rounded-sm"
            loading="lazy"
          />
          <div className="absolute top-[50%] left-[50%] -translate-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isPlaying && isActive ? <Pause /> : <Play />}
          </div>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 flex-1 items-center">
        <div className="flex flex-col self-stretch">
          <span
            className={`${isActive ? "text-green-500" : "group-hover:text-teal-500"} transition-colors duration-200 text-lg flex-1 font-bold overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {song.title}
          </span>
          <span className="text-sm text-neutral-500">{song.artist}</span>
        </div>
        <span>{song.albumName}</span>
        <span>{song.genre}</span>
        <div className="justify-self-end flex items-center gap-4">
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
