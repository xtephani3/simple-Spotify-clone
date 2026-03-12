import { create } from 'zustand';
import { Playlist, Song } from '../lib/data';

interface LibraryState {
  customPlaylists: Playlist[];
  likedSongs: Song[];
  createPlaylist: (name?: string) => void;
  toggleLikeSong: (song: Song) => void;
  isSongLiked: (songId: string) => boolean;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  customPlaylists: [],
  likedSongs: [],
  
  createPlaylist: (name?: string) => {
    set((state) => {
      const newPlaylist: Playlist = {
        id: `custom_${Date.now()}`,
        name: name || `My Playlist #${state.customPlaylists.length + 1}`,
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
  },

  addSongToPlaylist: (playlistId: string, song: Song) => {
    set((state) => ({
      customPlaylists: state.customPlaylists.map(pl => {
        if (pl.id === playlistId && !pl.songs.find(s => s.id === song.id)) {
          return { ...pl, songs: [...pl.songs, song] };
        }
        return pl;
      })
    }));
  }
}));
