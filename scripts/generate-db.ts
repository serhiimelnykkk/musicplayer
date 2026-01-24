import { faker } from "@faker-js/faker";
import fs from "fs";
import { type Song } from "../src/types";

const createSong = (filePath: string): Song => {
  const song: Song = {
    albumCover: faker.image.urlPicsumPhotos({ width: 128, height: 128 }),
    albumName: faker.music.album(),
    artist: faker.music.artist(),
    filePath: filePath,
    genre: faker.music.genre(),
    title: faker.music.songName(),
  };

  return song;
};

const songsFolderPath = "./public/music";
const songsPaths = fs.readdirSync(songsFolderPath);
const songs: Song[] = [];

for (let i = 0; i < songsPaths.length; i++) {
  const song = createSong(songsPaths[i]);
  songs.push(song);
}

const db = { songs };

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
