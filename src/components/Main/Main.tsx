import { Player } from "@/components/Player/Player";
import { PlaylistsList } from "@/components/PlaylistsList/PlaylistsList";
import { SongsList } from "@/components/SongsList/SongsList";
import { useHowlLoop } from "@/hooks/useHowlCycle";

export const Main = () => {
  useHowlLoop();

  return (
    <main className="relative grid grid-cols-[20%_1fr] h-dvh">
      <PlaylistsList />
      <div className="overflow-y-scroll h-full">
        <SongsList />
        <div className="sticky bottom-0 left-0 right-0">
          <Player />
        </div>
      </div>
    </main>
  );
};
