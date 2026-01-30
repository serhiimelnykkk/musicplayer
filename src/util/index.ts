export const durationToViewString = (initialDuration: number) => {
  const minutes = Math.floor(initialDuration / 60);
  const seconds = Math.floor(initialDuration % 60);
  const duration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return duration;
};
