import { PlaylistCreationDialog } from "@/components/PlaylistsList/PlaylistCreationDialog/PlaylistCreationDialog";
import { usePlaylists } from "@/store/playlistStore";

export const PlaylistsList = () => {
  const playlists = usePlaylists((state) => state.playlists);

  return (
    <ul>
      {playlists.map((playlist) => (
        <li>{playlist.name}</li>
      ))}
      <PlaylistCreationDialog />
    </ul>
  );
};
