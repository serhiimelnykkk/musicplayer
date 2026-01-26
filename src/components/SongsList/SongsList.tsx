import { Song } from "@/components/SongsList/Song/Song";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";

export const SongsList = () => {
  const { songs } = useSongs();
  const { currentSongId } = useCurrentSong();

  return (
    <ul className="list-none">
      {songs.map((song) => (
        <Song key={song.id} song={song} isActive={song.id === currentSongId} />
      ))}
    </ul>
  );
};
