import { Pause, Play } from "lucide-react";

import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useCurrentSong } from "@/store/currentSongStore";
import { type Song as SongType } from "@/types";
import { useShallow } from "zustand/shallow";

interface Props {
  song: SongType;
}

export const PlayButton = ({ song }: Props) => {
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

  return (
    <div className="size-8">
      <button className="relative" onClick={handlePlayClick}>
        <img
          src={song.albumCover}
          alt={`${song.title}'s album cover`}
          width={32}
          height={32}
          className="object-cover rounded-sm"
          loading="lazy"
        />
        <div className="absolute top-[50%] left-[50%] -translate-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isPlaying && isActive ? <Pause /> : <Play />}
        </div>
      </button>
    </div>
  );
};
