"use client";

import React from 'react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Play, Heart } from 'lucide-react';

export default function LikedSongs() {
  const { playSong, currentSong, isPlaying, setPlaylist } = usePlayerStore();
  const { likedSongs, toggleLikeSong } = useLibraryStore();

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      setPlaylist(likedSongs);
      playSong(likedSongs[0]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 w-full text-white bg-gradient-to-b from-[#4a2e8c] to-[#121212]">
      <div className="flex items-end gap-6 mb-8 mt-12">
        <div className="w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center shadow-2xl shadow-purple-900/50">
          <Heart className="w-20 h-20 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Playlist</p>
          <h1 className="text-6xl font-bold mb-6">Liked Songs</h1>
          <p className="text-sm text-gray-300 font-semibold">{likedSongs.length} songs</p>
        </div>
      </div>

      {likedSongs.length > 0 && (
        <div className="mb-8">
          <button 
            onClick={handlePlayAll}
            className="bg-[#1db954] text-black rounded-full p-4 hover:scale-105 transition shadow-xl"
          >
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Liked Songs List */}
      <div className="mt-8 border-t border-white/10 pt-4">
        {likedSongs.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-bold text-white mb-2">Songs you like will appear here</h2>
            <p>Save songs by tapping the heart icon.</p>
          </div>
        ) : (
          <div className="space-y-1 mt-4">
            <div className="grid grid-cols-[16px_1fr_48px] gap-4 mb-2 text-gray-400 text-sm px-4">
              <span>#</span>
              <span>Title</span>
              <span></span>
            </div>
            {likedSongs.map((song, idx) => {
              const isActive = currentSong?.id === song.id;
              return (
                <div 
                  key={song.id} 
                  className={`grid grid-cols-[16px_1fr_48px] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition group cursor-pointer px-4 ${isActive ? 'bg-white/5' : ''}`}
                  onClick={() => playSong(song)}
                >
                  <span className={`text-gray-400 ${isActive ? 'text-[#1db954]' : ''}`}>{idx + 1}</span>
                  <div className="flex items-center gap-4">
                    <img src={song.coverUrl} alt={song.title} className="h-10 w-10 object-cover" />
                    <div>
                      <p className={`font-semibold ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</p>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(song);
                    }}
                    className="text-[#1db954] hover:text-white transition"
                  >
                    <Heart className="w-5 h-5" fill="#1db954" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
