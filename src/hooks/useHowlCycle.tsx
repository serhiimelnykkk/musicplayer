import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";
import type { HowlOptions } from "howler";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

export const useHowlCycle = () => {
  const { currentSongId, setState, nextSong } = useCurrentSong(
    useShallow((state) => ({
      currentSongId: state.currentSongId,
      setState: state.setState,
      nextSong: state.nextSong,
    })),
  );

  const { songs } = useSongs();

  const howlRef = useHowl();
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentSongId) return;

    const songPath = songs.filter((song) => song.id === currentSongId)[0]
      .filePath;

    let howl = null;

    const howlOptions: HowlOptions = {
      src: songPath,
      html5: true,
      volume: useCurrentSong.getState().volume,
    };

    if (howlRef.current) {
      howl = new Howl({
        ...howlOptions,
        loop: howlRef.current.loop(),
      });
    } else {
      howl = new Howl(howlOptions);
    }

    howlRef.current = howl;

    const step = () => {
      const currentStep = Math.floor(howlRef.current?.seek() || 0);
      if (currentStep !== lastTimeRef.current) {
        setState({ currentPos: currentStep });
      }
      lastTimeRef.current = currentStep;
      rafRef.current = requestAnimationFrame(step);
    };

    howl.once("load", () => {
      howl.play();
      setState({ currentPos: 0 });
    });

    howl.on("play", () => {
      setState({ duration: howl.duration(), isPlaying: true });
      rafRef.current = requestAnimationFrame(step);
    });

    howl.on("pause", () => {
      setState({ isPlaying: false });
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    });

    howl.on("end", () => {
      if (howl.loop()) {
        howl.play();
        return;
      }
      nextSong(songs);
    });

    howl.on("volume", () => {
      setState({ volume: howl.volume() });
    });

    return () => {
      howl.unload();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [currentSongId, songs, setState, howlRef, nextSong]);
};
