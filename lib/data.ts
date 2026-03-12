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
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    duration: 147,
  },
  {
    id: "2",
    title: "Good Night",
    artist: "FASSounds",
    album: "Chill Beats",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92e?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_9650b28416.mp3?filename=good-night-160166.mp3",
    duration: 147,
  },
  {
    id: "3",
    title: "The Lounge",
    artist: "Lexin_Music",
    album: "Jazz Hop",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_d0c6ff1cb8.mp3?filename=the-lounge-41600.mp3",
    duration: 174,
  },
  {
    id: "4",
    title: "Deep Light",
    artist: "Zen_Man",
    album: "Ambient Sounds",
    coverUrl: "https://images.unsplash.com/photo-1621360811013-c76831f1628c?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=deep-light-70802.mp3",
    duration: 184,
  },
  {
    id: "5",
    title: "Price of Freedom",
    artist: "ZakharValaha",
    album: "Cinematic",
    coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_349d21ec28.mp3?filename=price-of-freedom-33106.mp3",
    duration: 153,
  }
];

export const playlists: Playlist[] = [
  {
    id: "p1",
    name: "Chill Lofi Beats",
    description: "Relaxing lofi beats for studying and focusing.",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
    songs: mockSongs.slice(0, 3),
  },
  {
    id: "p2",
    name: "Deep Focus",
    description: "Keep calm and focus with ambient and cinematic sounds.",
    coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
    songs: mockSongs.slice(3, 5),
  },
];
