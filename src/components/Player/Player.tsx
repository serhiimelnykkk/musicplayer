import { PlayerControlls } from "@/components/Player/PlayerControlls/PlayerControlls";
import { PlayerSong } from "@/components/Player/PlayerSong/PlayerSong";
import { SongProgress } from "@/components/Player/SongProgress/SongProgress";

export const Player = () => {
  return (
    <>
      <div className="flex gap-4">
        <PlayerSong />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-4">
          <PlayerControlls />
        </div>
        <SongProgress />
      </div>
    </>
  );
};
