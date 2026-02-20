import { PlaylistCreationDialog } from "@/components/PlaylistsList/PlaylistCreationDialog/PlaylistCreationDialog";
import { usePlaylists } from "@/store/playlistStore";

export const PlaylistsList = () => {
  const playlists = usePlaylists((state) => state.playlists);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <h3 className="text-xl font-bold">Playlists</h3>
          <div className="">
            <PlaylistCreationDialog />
          </div>
        </div>
        <ul className="flex flex-col">
          {playlists.map((playlist, index) => (
            <li
              key={playlist.id}
              className="group px-4 py-2 hover:bg-neutral-600 rounded-sm cursor-pointer grid grid-cols-[1.5rem_1fr] items-center"
            >
              <span className="group-hover:text-neutral-100 text-sm text-neutral-500">
                {index + 1}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {playlist.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
