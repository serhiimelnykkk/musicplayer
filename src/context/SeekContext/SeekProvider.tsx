import { SeekContext } from "@/context/SeekContext/SeekContext";
import { useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const SeekProvider = ({ children }: Props) => {
  const [currentPos, setCurrentPos] = useState([0]);

  const value = useMemo(() => {
    return { currentPos, setCurrentPos };
  }, [currentPos]);

  return <SeekContext value={value}>{children}</SeekContext>;
};
