import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export const Player = () => {
  const { songs } = useSongs();
  const { currentSongId } = useCurrentSong();
  const { isPlaying, setIsPlaying } = useIsPlaying();
  const howlRef = useHowl();

  const currentSong = currentSongId
    ? songs.filter((song) => song.id === currentSongId)[0]
    : null;

  const handlePlayClick = () => {
    if (howlRef.current) {
      const playing = howlRef.current.playing();
      if (playing) {
        howlRef.current.pause();
      } else {
        howlRef.current.play();
      }
      setIsPlaying(!playing);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <img
          src={currentSong?.albumCover}
          width={64}
          height={64}
          alt=""
          className="rounded-sm"
        />
        <div className="flex flex-col">
          <span className="font-bold flex-1">{currentSong?.title}</span>

          <span className="text-xs text-neutral-500">
            {currentSong?.artist} &middot; {currentSong?.albumName}
          </span>
        </div>
      </div>
      <div className="flex justify-self-center gap-4">
        <button>
          <SkipBack size={20} />
        </button>
        <button onClick={handlePlayClick}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button>
          <SkipForward size={20} />
        </button>
      </div>
    </>
  );
};
