import { VolumeSlider } from "@/components/Player/VolumeSlider/VolumeSlider";
import * as HowlRefContext from "@/context/HowlRefContext/HowlRefContext";
import * as currentSongStore from "@/store/currentSongStore";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.stubGlobal(
  "ResizeObserver",
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
);

const mockUseHowl = vi.fn();

vi.spyOn(HowlRefContext, "useHowl").mockReturnValue({
  current: { volume: mockUseHowl },
} as any);

describe("VolumeSlider", () => {
  afterEach(() => cleanup());

  it("Volume changed", () => {
    const INITIAL_VOLUME = 0.5;
    const VOLUME_STEP = 0.01;

    vi.spyOn(currentSongStore, "useCurrentSong").mockImplementation(
      (selector: any) =>
        selector({ volume: INITIAL_VOLUME, setVolume: () => {} }),
    );

    render(<VolumeSlider />);

    const thumb = screen.getByTestId("slider-thumb");
    fireEvent.keyDown(thumb, { key: "ArrowRight", code: "ArrowRight" });

    expect(mockUseHowl).toHaveBeenCalledWith(INITIAL_VOLUME + VOLUME_STEP);
  });
});
