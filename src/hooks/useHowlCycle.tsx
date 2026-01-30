import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSeek } from "@/context/SeekContext/SeekContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useEffect, useRef } from "react";

export const useHowlCycle = () => {
  const { currentSongId, setCurrentSongId, setDuration } = useCurrentSong();
  const { songs } = useSongs();
  const { setIsPlaying } = useIsPlaying();
  const howlRef = useHowl();
  const { setCurrentPos } = useSeek();
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentSongId) return;

    const songPath = songs.filter((song) => song.id === currentSongId)[0]
      .filePath;

    let howl = null;

    if (howlRef.current) {
      howl = new Howl({
        src: songPath,
        html5: true,
        loop: howlRef.current.loop(),
      });
    } else {
      howl = new Howl({
        src: songPath,
        html5: true,
      });
    }

    howlRef.current = howl;

    const step = () => {
      const currentStep = Math.floor(howlRef.current?.seek() || 0);
      if (currentStep !== lastTimeRef.current) {
        setCurrentPos([currentStep]);
        console.log("update", currentStep, lastTimeRef.current);
      }
      lastTimeRef.current = currentStep;
      rafRef.current = requestAnimationFrame(step);
    };

    howl.once("load", () => {
      howl.play();
      setCurrentPos([0]);
    });

    howl.on("play", () => {
      setIsPlaying(true);
      setDuration(howl.duration());
      rafRef.current = requestAnimationFrame(step);
    });

    howl.on("pause", () => {
      setIsPlaying(false);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    });

    // onEnd doesn't trigger when looping

    howl.on("end", () => {
      const currentSong = songs.find((song) => song.id === currentSongId);
      if (currentSong) {
        const currentSongIndex = songs.indexOf(currentSong);
        let nextSong = null;
        if (currentSongIndex === songs.length - 1) {
          nextSong = songs[0];
        } else {
          nextSong = songs[currentSongIndex + 1];
        }
        setCurrentSongId(nextSong.id);
      }
    });

    return () => {
      howl.unload();
    };
  }, [currentSongId, songs]);
};
