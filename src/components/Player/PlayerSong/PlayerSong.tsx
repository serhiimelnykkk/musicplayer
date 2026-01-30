import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/store";

export const PlayerSong = () => {
  const { songs } = useSongs();
  const { currentSongId } = useCurrentSong();

  const currentSong = currentSongId
    ? songs.filter((song) => song.id === currentSongId)[0]
    : null;

  return (
    <>
      <img
        src={currentSong?.albumCover}
        width={64}
        height={64}
        alt=""
        className="rounded-sm"
      />
      <div className="flex flex-col">
        <span className="font-bold flex-1">{currentSong?.title}</span>
        <span className="text-xs text-neutral-500">
          {currentSong?.artist} &middot; {currentSong?.albumName}
        </span>
      </div>
    </>
  );
};
