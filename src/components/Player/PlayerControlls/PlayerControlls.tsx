import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export const PlayerControlls = () => {
  const { songs } = useSongs();
  const { currentSongId, setCurrentSongId } = useCurrentSong();
  const { isPlaying } = useIsPlaying();
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
    }
  };

  const handleSkipBackClick = () => {
    if (!currentSong) {
      return;
    }
    const index = songs.indexOf(currentSong);
    if (index === 0) {
      const nextSong = songs[songs.length - 1];
      setCurrentSongId(nextSong.id);
    } else {
      const nextSong = songs[index - 1];
      setCurrentSongId(nextSong.id);
    }
  };

  const handleSkipForwardClick = () => {
    if (!currentSong) {
      return;
    }
    const index = songs.indexOf(currentSong);
    if (index === songs.length - 1) {
      const nextSong = songs[0];
      setCurrentSongId(nextSong.id);
    } else {
      const nextSong = songs[index + 1];
      setCurrentSongId(nextSong.id);
    }
  };

  return (
    <>
      <button onClick={handleSkipBackClick}>
        <SkipBack size={20} />
      </button>
      <button onClick={handlePlayClick}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button onClick={handleSkipForwardClick}>
        <SkipForward size={20} />
      </button>
    </>
  );
};
