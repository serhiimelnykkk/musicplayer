export interface Song {
  id: string;
  albumCover: string;
  albumName: string;
  artist: string;
  filePath: string;
  genre: string;
  title: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  songIds: Set<Song["id"]>;
}
