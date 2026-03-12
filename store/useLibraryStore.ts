import { create } from 'zustand';
import { Playlist, Song } from '../lib/data';

interface LibraryState {
  customPlaylists: Playlist[];
  likedSongs: Song[];
  createPlaylist: () => void;
  toggleLikeSong: (song: Song) => void;
  isSongLiked: (songId: string) => boolean;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  customPlaylists: [],
  likedSongs: [],
  
  createPlaylist: () => {
    set((state) => {
      const newPlaylist: Playlist = {
        id: `custom_${Date.now()}`,
        name: `My Playlist #${state.customPlaylists.length + 1}`,
        description: 'A custom playlist created by you.',
        coverUrl: 'https://picsum.photos/seed/' + Date.now() + '/300/300',
        songs: []
      };
      return { customPlaylists: [...state.customPlaylists, newPlaylist] };
    });
  },

  toggleLikeSong: (song: Song) => {
    set((state) => {
      const exists = state.likedSongs.find(s => s.id === song.id);
      if (exists) {
        return { likedSongs: state.likedSongs.filter(s => s.id !== song.id) };
      } else {
        return { likedSongs: [...state.likedSongs, song] };
      }
    });
  },

  isSongLiked: (songId: string) => {
    return get().likedSongs.some(s => s.id === songId);
  }
}));
