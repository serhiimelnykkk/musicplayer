import { CurrentSongProvider } from "@/context/CurrentSongContext/CurrentSongProvider";
import { HowlRefProvider } from "@/context/HowlRefContext/HowlRefProvider";
import { IsPlayingProvider } from "@/context/IsPlayingContext/IsPlayingProvider";
import { SongsProvider } from "@/context/SongsContext/SongsProvider";

import { Main } from "@/components/Main/Main";

export const App = () => {
  return (
    <IsPlayingProvider>
      <CurrentSongProvider>
        <HowlRefProvider>
          <SongsProvider>
            <Main />
          </SongsProvider>
        </HowlRefProvider>
      </CurrentSongProvider>
    </IsPlayingProvider>
  );
};
