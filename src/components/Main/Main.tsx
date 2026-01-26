import { Player } from "@/components/Player/Player";
import { SongsList } from "@/components/SongsList/SongsList";
import { useHowlCycle } from "@/hooks/useHowlCycle";

export const Main = () => {
  useHowlCycle();

  return (
    <main className="relative">
      <SongsList />
      <div className="grid grid-cols-[20%_1fr_20%] gap-4 py-2 px-4 sticky bottom-0 left-0 right-0 bg-neutral-950 text-neutral-100">
        <Player />
      </div>
    </main>
  );
};
