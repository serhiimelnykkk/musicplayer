import { Song } from "@/components/SongsList/Song/Song";
import { useCurrentSong } from "@/context/CurrentSongContext/CurrentSongContext";
import { useIsPlaying } from "@/context/IsPlayingContext/IsPlayingContext";
import { useSongs } from "@/context/SongsContext/SongsContext";

export const SongsList = () => {
  const { songs } = useSongs();
  const { currentSongId, setCurrentSongId } = useCurrentSong();
  const { isPlaying, setIsPlaying } = useIsPlaying();

  return (
    <ul className="list-none">
      {songs.map((song) => (
        <Song
          key={song.id}
          song={song}
          isActive={song.id === currentSongId}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSongId={setCurrentSongId}
        />
      ))}
    </ul>
  );
};
