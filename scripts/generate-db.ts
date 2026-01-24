import { faker } from "@faker-js/faker";
import fs from "fs";
import { Howl } from "howler";

interface Song {
  albumCover: string;
  albumName: string;
  artist: string;
  filePath: string;
  genre: string;
  title: string;
}

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
