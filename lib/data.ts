export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
}

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Lofi Study",
    artist: "FASSounds",
    album: "Lofi Vibes",
    coverUrl: "https://picsum.photos/seed/1/300/300",
    audioUrl: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kitten_Polka.mp3",
    duration: 147,
  },
  {
    id: "2",
    title: "Good Night",
    artist: "FASSounds",
    album: "Chill Beats",
    coverUrl: "https://picsum.photos/seed/2/300/300",
    audioUrl: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__Nxt.mp3",
    duration: 147,
  },
  {
    id: "3",
    title: "The Lounge",
    artist: "Lexin_Music",
    album: "Jazz Hop",
    coverUrl: "https://picsum.photos/seed/3/300/300",
    audioUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
    duration: 174,
  },
  {
    id: "4",
    title: "Deep Light",
    artist: "Zen_Man",
    album: "Ambient Sounds",
    coverUrl: "https://picsum.photos/seed/4/300/300",
    audioUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    duration: 184,
  },
  {
    id: "5",
    title: "Price of Freedom",
    artist: "ZakharValaha",
    album: "Cinematic",
    coverUrl: "https://picsum.photos/seed/5/300/300",
    audioUrl: "https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg",
    duration: 153,
  }
];

export const playlists: Playlist[] = [
  {
    id: "p1",
    name: "Chill Lofi Beats",
    description: "Relaxing lofi beats for studying and focusing.",
    coverUrl: "https://picsum.photos/seed/p1/300/300",
    songs: mockSongs.slice(0, 3),
  },
  {
    id: "p2",
    name: "Deep Focus",
    description: "Keep calm and focus with ambient and cinematic sounds.",
    coverUrl: "https://picsum.photos/seed/p2/300/300",
    songs: mockSongs.slice(3, 5),
  },
];
