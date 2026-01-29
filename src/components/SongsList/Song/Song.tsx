import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { type Song as SongType } from "@/types";
import { durationToViewString } from "@/util";
import { Pause, Play } from "lucide-react";
import { memo } from "react";

interface Props {
  song: SongType;
  isActive: boolean;
  isPlaying: boolean;
  setCurrentSongId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Song = memo(
  ({ song, isActive, isPlaying, setCurrentSongId }: Props) => {
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
      setCurrentSongId(song.id);
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
          <span className="justify-self-end">{duration}</span>
        </div>
      </li>
    );
  },
  (prevProps, newProps) => {
    if (prevProps.isActive === false && newProps.isActive === false) {
      return true;
    } else {
      return false;
    }
  },
);
