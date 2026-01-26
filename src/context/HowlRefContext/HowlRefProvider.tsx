import { HowlRefContext } from "@/context/HowlRefContext/HowlRefContext";
import { Howl } from "howler";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export const HowlRefProvider = ({ children }: Props) => {
  const howlRef = useRef<Howl | null>(null);

  return <HowlRefContext value={howlRef}>{children}</HowlRefContext>;
};
