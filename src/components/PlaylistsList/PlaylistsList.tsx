import { PlaylistCreationDialog } from "@/components/PlaylistsList/PlaylistCreationDialog/PlaylistCreationDialog";
import { usePlaylists } from "@/store/playlistStore";

export const PlaylistsList = () => {
  const playlists = usePlaylists((state) => state.playlists);

  return (
    <ul className="bg-neutral-900 text-neutral-100">
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
      <PlaylistCreationDialog />
    </ul>
  );
};
