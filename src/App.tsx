import { HowlRefProvider } from "@/context/HowlRefContext/HowlRefProvider";

import { getSongs } from "@/api";
import { Main } from "@/components/Main/Main";
import { useSongs } from "@/store/songsStore";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    async function fetchSongs() {
      const songs = await getSongs();
      useSongs.setState((state) => ({ ...state, songs: songs }));
    }
    fetchSongs();
  }, []);

  return (
    <HowlRefProvider>
      <Main />
    </HowlRefProvider>
  );
};
