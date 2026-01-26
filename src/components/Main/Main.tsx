import { SongsList } from "@/components/SongsList/SongsList";
import { useHowlCycle } from "@/hooks/useHowlCycle";

export const Main = () => {
  useHowlCycle();

  return (
    <main>
      <SongsList />
    </main>
  );
};
