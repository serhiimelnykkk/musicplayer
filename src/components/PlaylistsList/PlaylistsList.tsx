import { usePlaylists } from "@/store/playlistStore";
import {
  Close,
  Content,
  Root as Dialog,
  Overlay,
  Portal,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

interface Inputs {
  playlistName: string;
}

export const PlaylistsList = () => {
  const { playlists, createPlaylist } = usePlaylists(
    useShallow((state) => ({
      playlists: state.playlists,
      createPlaylist: state.createPlaylist,
    })),
  );

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    createPlaylist(data.playlistName);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ul>
      {playlists.map((playlist) => (
        <li>{playlist.name}</li>
      ))}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Trigger>
          <button>Add playlist</button>
        </Trigger>
        <Portal>
          <Overlay className="fixed inset-0 bg-black/50" />
          <Content className="p-4 flex flex-col text-neutral-100 fixed left-1/2 top-1/2 w-[90vw] max-w-md border border-neutral-700 rounded-sm max-h-64 bg-neutral-800 -translate-[50%]">
            <Close className="absolute right-1 top-1 hover:text-red-400 transition-colors duration-200">
              <button>
                <CloseIcon size={20} />
              </button>
            </Close>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Title className="text-xl font-bold">Create new playlist</Title>
              <div className="flex gap-4 items-center">
                <label htmlFor="playlistName">Playlist Name</label>
                <input
                  type="text"
                  placeholder="Playlist Name"
                  className="border-2 border-neutral-700 rounded-sm p-2 text-sm flex-1"
                  {...register("playlistName")}
                />
              </div>
              <button
                type="submit"
                className="font-bold px-4 py-2 bg-green-800 rounded-sm self-end"
              >
                Create playlist
              </button>
            </form>
          </Content>
        </Portal>
      </Dialog>
    </ul>
  );
};
