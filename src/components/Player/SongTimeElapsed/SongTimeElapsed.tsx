import { useCurrentSong } from "@/store/currentSongStore";
import { durationToViewString } from "@/util";

export const SongTimeElapsed = () => {
  const currentPos = useCurrentSong((state) => state.currentPos);
  const viewCurrentPos = durationToViewString(currentPos);

  return <div className="text-xs">{viewCurrentPos}</div>;
};
