import { create } from 'zustand';
import { Song, mockSongs } from '../lib/data';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isShuffled: boolean;
  repeatMode: "off" | "one" | "all";
  playlist: Song[];
  playSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setPlaylist: (songs: Song[]) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 1, // 0 to 1
  isShuffled: false,
  repeatMode: "off",
  playlist: mockSongs,
  
  playSong: (song: Song) => set({ currentSong: song, isPlaying: true }),
  
  togglePlay: () => set((state) => ({ 
    isPlaying: state.currentSong ? !state.isPlaying : false 
  })),
  
  setVolume: (volume: number) => set({ volume }),

  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),

  cycleRepeatMode: () =>
    set((state) => ({
      repeatMode:
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
          ? "one"
          : "off",
    })),
  
  setPlaylist: (songs: Song[]) => set({ playlist: songs }),
  
  playNext: () => {
    const { currentSong, playlist, isShuffled, repeatMode } = get();
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    if (!isShuffled) {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        if (repeatMode === "all") {
          set({ currentSong: playlist[0], isPlaying: true });
        } else {
          set({ isPlaying: false });
        }
        return;
      }
      set({ currentSong: playlist[nextIndex], isPlaying: true });
      return;
    }

    if (playlist.length === 1) {
      set({ currentSong: playlist[0], isPlaying: true });
      return;
    }

    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }
    set({ currentSong: playlist[nextIndex], isPlaying: true });
  },
  
  playPrevious: () => {
    const { currentSong, playlist, isShuffled } = get();
    if (!currentSong || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    if (!isShuffled) {
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      set({ currentSong: playlist[prevIndex], isPlaying: true });
      return;
    }

    if (playlist.length === 1) {
      set({ currentSong: playlist[0], isPlaying: true });
      return;
    }

    let prevIndex = currentIndex;
    while (prevIndex === currentIndex) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    }
    set({ currentSong: playlist[prevIndex], isPlaying: true });
  }
}));
