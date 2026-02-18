import { Player } from "@/components/Player/Player";
import { SongsList } from "@/components/SongsList/SongsList";
import { useHowlLoop } from "@/hooks/useHowlCycle";

export const Main = () => {
  useHowlLoop();

  return (
    <main className="relative">
      <SongsList />
      <div className="sticky bottom-0 left-0 right-0 ">
        <Player />
      </div>
    </main>
  );
};
