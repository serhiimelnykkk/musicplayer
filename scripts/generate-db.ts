import { faker } from "@faker-js/faker";
import fs from "fs";
import { parseFile } from "music-metadata";
import path from "path";
import { type Song } from "../src/types";

const createSong = async (filePath: string): Promise<Song> => {
  const metadata = await parseFile(filePath);

  const duration = metadata.format.duration || 0;

  const song: Song = {
    id: faker.string.uuid(),
    albumCover: faker.image.urlPicsumPhotos({ width: 64, height: 64 }),
    albumName: faker.music.album(),
    artist: faker.music.artist(),
    filePath: filePath,
    genre: faker.music.genre(),
    title: faker.music.songName(),
    duration: duration,
  };

  return song;
};

const generateDb = async () => {
  const songsFolderPath = path.join(process.cwd(), "public", "music");
  const songsPaths = fs.readdirSync(songsFolderPath);

  const promises = songsPaths.map((path) =>
    createSong(`${songsFolderPath}/${path}`),
  );

  const songs = await Promise.all(promises);

  const db = { songs };

  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
};

generateDb();
