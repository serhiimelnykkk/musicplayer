import { useHowl } from "@/context/HowlRefContext/HowlRefContext";
import { useCurrentSong } from "@/store";
import { Range, Root as Slider, Thumb, Track } from "@radix-ui/react-slider";

export const VolumeSlider = () => {
  const volume = useCurrentSong((state) => state.volume);
  const howlRef = useHowl();

  const handleSliderChange = (value: number[]) => {
    if (howlRef.current) {
      howlRef.current.volume(value[0]);
    }
  };

  return (
    <>
      <Slider
        defaultValue={[volume]}
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={(value) => handleSliderChange(value)}
        className="relative flex items-center h-1.5 group/root"
      >
        <Track className="relative flex-1 bg-neutral-600 h-full rounded-full">
          <Range className="absolute bg-neutral-100 group-hover/root:bg-green-500 h-full rounded-full" />
        </Track>
        <Thumb className="relative focus:outline-0 opacity-0 group-hover/root:opacity-100 block size-4 bg-neutral-300 rounded-full group">
          <span className="scale-0 group-focus:scale-100 transition-transform duration-200 -z-10 opacity-50 absolute top-[50%] left-[50%] size-6 -translate-[50%] bg-green-500 rounded-full" />
          <span className="scale-100 group-focus:scale-0 transition-transform duration-200 absolute top-[50%] left-[50%] -translate-[50%] size-2 bg-green-500 rounded-full" />
        </Thumb>
      </Slider>
    </>
  );
};
