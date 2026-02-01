import { PlayerControlls } from "@/components/Player/PlayerControlls/PlayerControlls";
import { PlayerSong } from "@/components/Player/PlayerSong/PlayerSong";
import { SongDuration } from "@/components/Player/SongDuration/SongDuration";
import { SongProgress } from "@/components/Player/SongProgress/SongProgress";
import { SongTimeElapsed } from "@/components/Player/SongTimeElapsed/SongTimeElapsed";
import { VolumeSlider } from "@/components/Player/VolumeSlider/VolumeSlider";
import { Volume } from "lucide-react";

export const Player = () => {
  return (
    <div className="grid grid-cols-[30%_1fr_30%] gap-4 py-2 px-4 min-h-20 bg-neutral-950 text-neutral-100">
      <div className="flex gap-4">
        <PlayerSong />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex self-center gap-4">
          <PlayerControlls />
        </div>
        <div className="flex items-center gap-4">
          <SongTimeElapsed />
          <SongProgress />
          <SongDuration />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="flex min-w-[40%] items-center">
          <Volume size={20} />
          <div className="flex-1">
            <VolumeSlider />
          </div>
        </div>
      </div>
    </div>
  );
};
