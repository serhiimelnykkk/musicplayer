import { PlayerControlls } from "@/components/Player/PlayerControlls/PlayerControlls";
import { PlayerSong } from "@/components/Player/PlayerSong/PlayerSong";

export const Player = () => {
  return (
    <>
      <div className="flex gap-4">
        <PlayerSong />
      </div>
      <div className="flex justify-self-center gap-4">
        <PlayerControlls />
      </div>
    </>
  );
};
