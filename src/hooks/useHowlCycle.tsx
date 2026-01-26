import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useEffect } from "react";

export const useHowlCycle = () => {
  const { currentSongId, setCurrentSongId } = useCurrentSong();
  const { songs } = useSongs();
  const howlRef = useHowl();

  useEffect(() => {
    if (!currentSongId) return;

    const songPath = songs.filter((song) => song.id === currentSongId)[0]
      .filePath;

    const howl = new Howl({ src: songPath, html5: true });
    howlRef.current = howl;

    howl.once("load", () => {
      howl.play();
    });

    howl.on("end", () => {
      setCurrentSongId(null);
    });

    return () => {
      howl.unload();
    };
  }, [currentSongId, songs]);
};
