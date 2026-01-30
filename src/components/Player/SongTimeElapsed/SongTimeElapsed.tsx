import { useCurrentSong } from "@/store";
import { durationToViewString } from "@/util";

export const SongTimeElapsed = () => {
  const { currentPos } = useCurrentSong();
  const viewCurrentPos = durationToViewString(currentPos[0]);

  return <div className="text-xs">{viewCurrentPos}</div>;
};
