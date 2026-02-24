import { Player } from "@/components/Player/Player";
import { PlaylistsList } from "@/components/PlaylistsList/PlaylistsList";
import { DialogRoot } from "@/components/SongsList/Dialog/DialogRoot";
import { useHowlLoop } from "@/hooks/useHowlLoop";

export const Main = () => {
  useHowlLoop();

  return (
    <main className="relative h-dvh flex flex-col">
      <div className="grid grid-cols-[20%_1fr] overflow-hidden">
        <div className="overflow-y-auto h-full p-4 border-r border-neutral-600 bg-neutral-900 text-neutral-100">
          <PlaylistsList />
        </div>
        <div className="overflow-y-auto h-full bg-neutral-900">
          <DialogRoot />
        </div>
      </div>
      <div className="sticky">
        <Player />
      </div>
    </main>
  );
};
