import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useEffect } from "react";

export const useHowlCycle = () => {
  const { currentSongId, setCurrentSongId } = useCurrentSong();
  const { songs } = useSongs();
  const { setIsPlaying } = useIsPlaying();
  const howlRef = useHowl();

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

    howl.once("load", () => {
      howl.play();
    });

    howl.on("play", () => {
      setIsPlaying(true);
    });

    howl.on("pause", () => {
      setIsPlaying(false);
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
