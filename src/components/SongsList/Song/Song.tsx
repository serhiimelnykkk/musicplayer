import { type Song as SongType } from "@/types";
import { Howl } from "howler";
import { useState, useMemo, useEffect } from "react";

interface Props {
  song: SongType;
}

export const Song = ({ song }: Props) => {
  return (
    <div>
      <img src={song.albumCover} alt={`${song.title}'s album cover`} />
      <span>{song.title}</span>
      <span>{song.artist}</span>
      <span>{song.albumName}</span>
      <span>{song.genre}</span>
      <span>{song.duration}</span>
    </div>
  );
};
