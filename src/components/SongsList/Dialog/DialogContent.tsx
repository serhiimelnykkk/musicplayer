import { PlaylistsDropdown } from "@/components/SongsList/Dialog/PlaylistsDropdown/PlaylistsDropdown";
import { usePlaylists } from "@/store/playlistStore";
import { useSongDialog } from "@/store/songDialogStore";
import { Close, Content, Title } from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

export const DialogContent = () => {
  const songId = useSongDialog((state) => state.songId);

  const { playlists, addSong } = usePlaylists(
    useShallow((state) => ({
      playlists: state.playlists,
      addSong: state.addSong,
    })),
  );

  const [checkedPlaylistIds, setCheckedPlaylistIds] = useState<
    (typeof playlists)[number]["id"][]
  >([]);

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!songId) {
      return;
    }
    checkedPlaylistIds.forEach((id) => addSong(id, songId));
  };

  const handleCheckedChange = (
    checked: boolean,
    playlistId: (typeof playlists)[number]["id"],
  ) => {
    if (checked) {
      setCheckedPlaylistIds((prev) => [...prev, playlistId]);
    } else {
      setCheckedPlaylistIds((prev) => prev.filter((id) => id !== playlistId));
    }
  };

  return (
    <Content className="p-4 flex flex-col text-neutral-100 fixed left-1/2 top-1/2 w-[90vw] max-w-md border border-neutral-700 rounded-sm max-h-64 bg-neutral-800 -translate-[50%]">
      <Close
        asChild
        className="absolute right-1 top-1 hover:text-red-400 transition-colors duration-200"
      >
        <button>
          <CloseIcon size={20} />
        </button>
      </Close>
      <form
        onSubmit={(event) => handleFormSubmit(event)}
        className="flex flex-col gap-4"
      >
        <Title className="text-xl font-bold">Add song to playlists</Title>
        <PlaylistsDropdown
          handleCheckedChange={handleCheckedChange}
          checkedPlaylistIds={checkedPlaylistIds}
        />
        <button
          type="submit"
          className="font-bold px-4 py-2 bg-green-800 rounded-sm self-end hover:outline-green-500 hover:outline-2"
        >
          Save
        </button>
      </form>
    </Content>
  );
};
