import { Song } from "@/components/SongsList/Song/Song";
import { useSongs } from "@/context/SongsContext/SongsContext";

export const SongsList = () => {
  const { songs } = useSongs();

  return (
    <ul className="list-none">
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </ul>
  );
};
