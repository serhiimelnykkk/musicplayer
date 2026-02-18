import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";
import type { HowlOptions } from "howler";
import { useEffect, useRef } from "react";

export const useHowlCycle = () => {
  const currentSongId = useCurrentSong((state) => state.currentSongId);

  const { songs } = useSongs();

  const howlRef = useHowl();
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentSongId) return;

    const songPath = songs.filter((song) => song.id === currentSongId)[0]
      .filePath;
    const { onLoad, onPause, onPlay, setVolume, setPos, nextSong } =
      useCurrentSong.getState();

    const howlOptions: HowlOptions = {
      src: songPath,
      html5: true,
      volume: useCurrentSong.getState().volume,
      loop: howlRef.current ? howlRef.current.loop() : false,

      onload: () => {
        howl.play();
        onLoad();
      },
      onplay: () => {
        onPlay(howl.duration());
        rafRef.current = requestAnimationFrame(step);
      },
      onpause: () => {
        onPause();
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      },
      onend: () => {
        if (howl.loop()) {
          return howl.seek(0);
        }
        nextSong(songs);
      },
      onvolume: () => {
        setVolume(howl.volume());
      },
    };

    const howl = new Howl(howlOptions);

    howlRef.current = howl;

    const step = () => {
      const currentStep = Math.floor(howl.seek() || 0);
      if (currentStep !== lastTimeRef.current) {
        setPos(currentStep);
      }
      lastTimeRef.current = currentStep;
      rafRef.current = requestAnimationFrame(step);
    };

    return () => {
      howl.unload();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [currentSongId, songs, howlRef]);
};
