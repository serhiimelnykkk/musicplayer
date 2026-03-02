import { Song } from "@/components/SongsList/Song/Song";

import { usePlaylists } from "@/store/playlistStore";
import { useSongs } from "@/store/songsStore";
import { useMemo } from "react";

export const SongsList = () => {
  const songs = useSongs((state) => state.songs);

  const playlist = usePlaylists((state) =>
    state.currentPlaylistId
      ? state.playlists.find(
          (playlist) => playlist.id === state.currentPlaylistId,
        )?.songIds
      : null,
  );

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
