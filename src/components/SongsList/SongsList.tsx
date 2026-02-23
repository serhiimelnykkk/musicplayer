import { Song } from "@/components/SongsList/Song/Song";
import { useSongs } from "@/context/SongsContext/SongsContext";
import { usePlaylists } from "@/store/playlistStore";
import { useMemo } from "react";

export const SongsList = () => {
  const { songs } = useSongs();

  const playlist = usePlaylists((state) =>
    state.currentPlaylistId
      ? state.playlists.find(
          (playlist) => playlist.id === state.currentPlaylistId,
        )?.songIds
      : null,
  );

  console.log(playlist);

  const songsToRender = useMemo(
    () => (playlist ? songs.filter((song) => playlist.has(song.id)) : songs),
    [playlist, songs],
  );

  return (
    <ul>
      {songsToRender.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </ul>
  );
};
