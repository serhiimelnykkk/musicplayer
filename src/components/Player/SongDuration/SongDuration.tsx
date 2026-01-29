import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { durationToViewString } from "@/util";

export const SongDuration = () => {
  const { duration } = useCurrentSong();

  const viewDuration = durationToViewString(duration);

  return <div className="text-xs">{viewDuration}</div>;
};
