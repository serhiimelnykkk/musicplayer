import { useCurrentSong } from "@/store";
import { durationToViewString } from "@/util";

export const SongDuration = () => {
  const duration = useCurrentSong((state) => state.duration);

  const viewDuration = durationToViewString(duration);

  return <div className="text-xs">{viewDuration}</div>;
};
