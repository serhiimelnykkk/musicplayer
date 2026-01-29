import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSeek } from "@/context/SeekContext/SeekContext";
import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { useCallback, useEffect, useRef } from "react";

export const SongProgress = () => {
  const { currentSongId, duration } = useCurrentSong();
  const { currentPos, setCurrentPos } = useSeek();
  const { isPlaying } = useIsPlaying();
  const howlRef = useHowl();

  const intervalRef = useRef(0);

  const restart = useCallback(() => {
    clearInterval(intervalRef.current);
    const intervalId = setInterval(
      () =>
        setCurrentPos((prev) => {
          if (prev[0] >= duration - 1) {
            clearInterval(intervalId);
            return [0];
          }
          return [prev[0] + 1];
        }),
      1000,
    );
    intervalRef.current = intervalId;
  }, [duration, setCurrentPos]);

  useEffect(() => {
    if (isPlaying) {
      restart();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isPlaying, restart]);

  useEffect(() => {
    if (!currentSongId) return;

    restart();

    return () => clearInterval(intervalRef.current);
  }, [currentSongId, duration, restart]);

  const handleValueChange = (value: number[]) => {
    setCurrentPos(value);
    clearInterval(intervalRef.current);
  };

  const handleValueCommit = (value: number[]) => {
    howlRef.current?.seek(value[0]);
    if (isPlaying) {
      restart();
    }
  };

  return (
    <Root
      disabled={currentSongId ? false : true}
      max={duration || 0}
      value={currentPos}
      onValueChange={(value) => handleValueChange(value)}
      onValueCommit={(value) => handleValueCommit(value)}
      className="relative flex items-center w-full h-1.5 group/root"
    >
      <Track className="relative flex-1 bg-neutral-600 h-full rounded-full">
        <Range className="absolute bg-neutral-100 group-hover/root:bg-green-500 h-full rounded-full" />
      </Track>
      <Thumb className="relative focus:outline-0 opacity-0 group-hover/root:opacity-100 block size-4 bg-neutral-300 rounded-full group">
        <span className="scale-0 group-focus:scale-100 transition-transform duration-200 -z-10 opacity-50 absolute top-[50%] left-[50%] size-6 -translate-[50%] bg-green-500 rounded-full" />
        <span className="scale-100 group-focus:scale-0 transition-transform duration-200 absolute top-[50%] left-[50%] -translate-[50%] size-2 bg-green-500 rounded-full" />
      </Thumb>
    </Root>
  );
};
