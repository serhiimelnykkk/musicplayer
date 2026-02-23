import { PlaylistsDropdown } from "@/components/SongsList/Dialog/PlaylistsDropdown/PlaylistsDropdown";
import { usePlaylists } from "@/store/playlistStore";
import { useSongDialog } from "@/store/songDialogStore";
import { Title } from "@radix-ui/react-dialog";
import { useShallow } from "zustand/shallow";

export const DialogContentForm = () => {
  const { songId, checkedPlaylistIds } = useSongDialog(
    useShallow((state) => ({
      songId: state.songId,
      checkedPlaylistIds: state.checkedPlaylistIds,
    })),
  );

  const addSong = usePlaylists((state) => state.addSong);

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!songId) {
      return;
    }
    checkedPlaylistIds.forEach((id) => addSong(id, songId));
  };

  return (
    <form
      onSubmit={(event) => handleFormSubmit(event)}
      className="flex flex-col gap-4"
    >
      <Title className="text-xl font-bold">Add song to playlists</Title>
      <PlaylistsDropdown />
      <button
        type="submit"
        className="font-bold px-4 py-2 bg-green-800 rounded-sm self-end hover:outline-green-500 hover:outline-2"
      >
        Save
      </button>
    </form>
  );
};
