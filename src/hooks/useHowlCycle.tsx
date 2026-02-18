import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";
import type { HowlOptions } from "howler";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

export const useHowlCycle = () => {
  const { currentSongId } = useCurrentSong(
    useShallow((state) => ({
      currentSongId: state.currentSongId,
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

    const state = useCurrentSong.getState();

    const step = () => {
      const currentStep = Math.floor(howl.seek() || 0);
      if (currentStep !== lastTimeRef.current) {
        state.setPos(currentStep);
      }
      lastTimeRef.current = currentStep;
      rafRef.current = requestAnimationFrame(step);
    };

    howl.once("load", () => {
      howl.play();
      state.onLoad();
    });

    howl.on("play", () => {
      state.onPlay(howl.duration());
      rafRef.current = requestAnimationFrame(step);
    });

    howl.on("pause", () => {
      state.onPause();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    });

    howl.on("end", () => {
      if (howl.loop()) {
        return howl.play();
      }
      state.nextSong(songs);
    });

    howl.on("volume", () => {
      state.setVolume(howl.volume());
    });

    return () => {
      howl.unload();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [currentSongId, songs, howlRef]);
};
