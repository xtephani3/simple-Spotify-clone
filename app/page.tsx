"use client";

import React from 'react';
import { playlists, mockSongs } from '../lib/data';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play } from 'lucide-react';

export default function Home() {
  const { playSong, currentSong, isPlaying } = usePlayerStore();

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 w-full text-white bg-gradient-to-b from-[#1f1f1f] to-[#121212]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Good morning</h2>
      </header>

      {/* Featured Playlists Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            className="flex items-center bg-white/10 hover:bg-white/20 transition rounded overflow-hidden cursor-pointer group"
          >
            <img src={playlist.coverUrl} alt={playlist.name} className="h-16 w-16 shadow-lg object-cover" />
            <span className="font-semibold mx-4">{playlist.name}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                playSong(playlist.songs[0]);
              }}
              className="ml-auto mr-4 bg-[#1db954] text-black rounded-full p-3 opacity-0 group-hover:opacity-100 transition shadow-xl hover:scale-105"
            >
              <Play className="w-5 h-5 ml-1" fill="currentColor" />
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Made for you</h2>
      
      {/* Horizontal List of Songs */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        {mockSongs.map((song) => {
          const isActive = currentSong?.id === song.id;

          return (
            <div 
              key={song.id} 
              className="flex-shrink-0 w-44 bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition cursor-pointer group"
              onClick={() => playSong(song)}
            >
              <div className="relative w-full aspect-square mb-4 shadow-lg rounded-md overflow-hidden">
                <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
                <button 
                  className={`absolute right-2 bottom-2 bg-[#1db954] text-black rounded-full p-3 transition shadow-xl hover:scale-105 ${isActive && isPlaying ? 'opacity-100' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
                >
                  <Play className="w-5 h-5 ml-1" fill="currentColor" />
                </button>
              </div>
              <h3 className={`font-semibold mb-1 truncate ${isActive ? 'text-[#1db954]' : 'text-white'}`}>
                {song.title}
              </h3>
              <p className="text-sm text-[#b3b3b3] truncate">{song.artist}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
