import { create } from 'zustand';
import { Song, mockSongs } from '../lib/data';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  playlist: Song[];
  playSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setPlaylist: (songs: Song[]) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 1, // 0 to 1
  playlist: mockSongs,
  
  playSong: (song: Song) => set({ currentSong: song, isPlaying: true }),
  
  togglePlay: () => set((state) => ({ 
    isPlaying: state.currentSong ? !state.isPlaying : false 
  })),
  
  setVolume: (volume: number) => set({ volume }),
  
  setPlaylist: (songs: Song[]) => set({ playlist: songs }),
  
  playNext: () => {
    const { currentSong, playlist } = get();
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ currentSong: playlist[nextIndex], isPlaying: true });
  },
  
  playPrevious: () => {
    const { currentSong, playlist } = get();
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ currentSong: playlist[prevIndex], isPlaying: true });
  }
}));
