import { Song } from "@/components/SongsList/Song/Song";
import { useSongs } from "@/context/SongsContext/SongsContext";

export const SongsList = () => {
  const { songs } = useSongs();

  return (
    <ul>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </ul>
  );
};
