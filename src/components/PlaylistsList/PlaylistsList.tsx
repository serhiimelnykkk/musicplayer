import { usePlaylists } from "@/store/playlistStore";

const PlaylistsList = () => {
  const playlists = usePlaylists((state) => state.playlists);

  return (
    <ul>
      {playlists.map((playlist) => (
        <>{playlist.name}</>
      ))}
    </ul>
  );
};

export default PlaylistsList;
