import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";
import { Pause, Play, Repeat, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

export const PlayerControlls = () => {
  const { songs } = useSongs();
  const { currentSongId, isPlaying, setState } = useCurrentSong();
  const howlRef = useHowl();

  const [isLooping, setIsLooping] = useState(false);

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
      setState({ currentSongId: nextSong.id });
    } else {
      const nextSong = songs[index - 1];
      setState({ currentSongId: nextSong.id });
    }
  };

  const handleSkipForwardClick = () => {
    if (!currentSong) {
      return;
    }
    const index = songs.indexOf(currentSong);
    if (index === songs.length - 1) {
      const nextSong = songs[0];
      setState({ currentSongId: nextSong.id });
    } else {
      const nextSong = songs[index + 1];
      setState({ currentSongId: nextSong.id });
    }
  };

  const handleLoopClick = () => {
    if (howlRef.current) {
      const currentLoopState = howlRef.current.loop();
      howlRef.current.loop(!currentLoopState);
      setIsLooping(!currentLoopState);
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
      <button
        onClick={handleLoopClick}
        className={`${isLooping ? "text-green-500" : ""} transition-colors duration-200`}
      >
        <Repeat size={20} />
      </button>
    </>
  );
};
