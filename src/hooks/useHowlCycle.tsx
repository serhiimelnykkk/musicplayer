import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

export const useHowlCycle = () => {
  const { currentSongId, setState } = useCurrentSong(
    useShallow((state) => ({
      currentSongId: state.currentSongId,
      setState: state.setState,
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

      const currentSong = songs.find((song) => song.id === currentSongId);

      if (currentSong) {
        const currentSongIndex = songs.indexOf(currentSong);
        let nextSong = null;
        if (currentSongIndex === songs.length - 1) {
          nextSong = songs[0];
        } else {
          nextSong = songs[currentSongIndex + 1];
        }
        setState({ currentSongId: nextSong.id });
      }
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
  }, [currentSongId, songs, setState]);
};
