import { faker } from "@faker-js/faker";
import fs from "fs";
import { parseFile } from "music-metadata";
import path from "path";
import { type Song } from "../src/types";

// scripts/generate-db.ts

const createSong = async (
  songsFolderPath: string,
  fileName: string,
): Promise<Song> => {
  const fullFilePath = path.join(songsFolderPath, fileName);
  const metadata = await parseFile(fullFilePath);

  const duration = metadata.format.duration || 0;

  return {
    id: faker.string.uuid(),
    albumCover: faker.image.urlPicsumPhotos({ width: 64, height: 64 }),
    albumName: faker.music.album(),
    artist: faker.music.artist(),
    filePath: `/music/${fileName}`,
    genre: faker.music.genre(),
    title: faker.music.songName(),
    duration: duration,
  };
};

const generateDb = async () => {
  const songsFolderPath = path.join(process.cwd(), "public", "music");
  const songsPaths = fs
    .readdirSync(songsFolderPath)
    .filter((file) => !file.startsWith("."));

  const promises = songsPaths.map((fileName) =>
    createSong(songsFolderPath, fileName),
  );

  const songs = await Promise.all(promises);
  const db = { songs };

  const outputPath = path.join(process.cwd(), "public", "db.json");
  fs.writeFileSync(outputPath, JSON.stringify(db, null, 2));
};

generateDb();
