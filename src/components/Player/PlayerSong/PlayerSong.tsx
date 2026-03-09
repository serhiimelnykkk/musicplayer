import { useCurrentSong } from "@/store/currentSongStore";
import { useSongs } from "@/store/songsStore";
import { useMemo } from "react";

export const PlayerSong = () => {
  const songs = useSongs((state) => state.songs);
  const currentSongId = useCurrentSong((state) => state.currentSongId);

  const currentSong = useMemo(() => {
    return currentSongId
      ? songs.find((song) => song.id === currentSongId)
      : null;
  }, [currentSongId, songs]);

  if (!currentSong) {
    return null;
  }

  return (
    <>
      <img
        src={currentSong?.albumCover}
        width={64}
        height={64}
        alt={`${currentSong && currentSong.title}'s album cover.`}
        className="rounded-sm"
      />
      <div className="flex flex-col overflow-hidden">
        <span className="font-bold flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          {currentSong?.title}
        </span>
        <span className="text-xs text-neutral-500 overflow-hidden whitespace-nowrap text-ellipsis">
          {currentSong?.artist} &middot; {currentSong?.albumName}
        </span>
      </div>
    </>
  );
};
