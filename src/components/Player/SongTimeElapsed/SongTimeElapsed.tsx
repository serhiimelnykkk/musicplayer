import { useSeek } from "@/context/SeekContext/SeekContext";
import { durationToViewString } from "@/util";

export const SongTimeElapsed = () => {
  const { currentPos } = useSeek();
  const viewCurrentPos = durationToViewString(currentPos[0]);

  return <div className="text-xs">{viewCurrentPos}</div>;
};
