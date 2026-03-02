import type { Song } from "@/types";

const dbUrl = "/db.json";

type ResponseType = {
  songs: Song[];
};

export const getSongs = async () =>
  await fetch(dbUrl)
    .then<ResponseType>((res) => res.json())
    .then((data) => data.songs);
