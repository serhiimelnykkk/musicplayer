import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useCurrentSong } from "@/store";
import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const SongProgress = () => {
  const { currentSongId, duration, currentPos, setState } = useCurrentSong(
    useShallow((state) => ({
      currentSongId: state.currentSongId,
      duration: state.duration,
      currentPos: state.currentPos,
      setState: state.setState,
    })),
  );
  const howlRef = useHowl();

  const [sliderValue, setSliderValue] = useState([0]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setSliderValue(currentPos);
    }
  }, [currentPos, isDragging]);

  const handleValueChange = (value: number[]) => {
    setSliderValue(value);
    setIsDragging(true);
  };

  const handleValueCommit = (value: number[]) => {
    howlRef.current?.seek(value[0]);
    setState({ currentPos: value });
    setIsDragging(false);
  };

  return (
    <Root
      disabled={currentSongId ? false : true}
      max={duration || 0}
      value={sliderValue}
      onValueChange={(value) => handleValueChange(value)}
      onValueCommit={(value) => handleValueCommit(value)}
      className="relative flex items-center w-full h-1.5 group/root"
    >
      <Track className="relative flex-1 bg-neutral-600 h-full rounded-full">
        <Range className="absolute bg-neutral-100 group-hover/root:bg-green-500 h-full rounded-full" />
      </Track>
      <Thumb className="relative focus:outline-0 opacity-0 group-hover/root:opacity-100 block size-4 bg-neutral-300 rounded-full group">
        <span className="scale-0 group-focus:scale-100 transition-transform duration-200 -z-10 opacity-50 absolute top-[50%] left-[50%] size-6 -translate-[50%] bg-green-500 rounded-full" />
        <span className="scale-100 group-focus:scale-0 transition-transform duration-200 absolute top-[50%] left-[50%] -translate-[50%] size-2 bg-green-500 rounded-full" />
      </Thumb>
    </Root>
  );
};
