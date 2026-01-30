import { HowlRefProvider } from "@/context/HowlRefContext/HowlRefProvider";
import { SongsProvider } from "@/context/SongsContext/SongsProvider";

import { Main } from "@/components/Main/Main";

export const App = () => {
  return (
    <HowlRefProvider>
      <SongsProvider>
        <Main />
      </SongsProvider>
    </HowlRefProvider>
  );
};
