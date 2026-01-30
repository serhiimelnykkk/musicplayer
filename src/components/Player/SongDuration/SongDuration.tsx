import { useCurrentSong } from "@/store";
import { durationToViewString } from "@/util";

export const SongDuration = () => {
  const { duration } = useCurrentSong();

  const viewDuration = durationToViewString(duration || 0);

  return <div className="text-xs">{viewDuration}</div>;
};
