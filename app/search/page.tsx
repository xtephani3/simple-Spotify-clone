"use client";

import React, { useState } from 'react';
import { mockSongs } from '../../lib/data';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Play, Heart, Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');
  const { playSong, currentSong, isPlaying } = usePlayerStore();
  const { toggleLikeSong, isSongLiked } = useLibraryStore();

  const filteredSongs = mockSongs.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) || 
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 w-full text-white bg-[#121212]">
      <div className="mb-8 max-w-sm relative">
        <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full bg-[#242424] text-white rounded-full py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-white border-none"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Browse All</h2>
      
      {query && (
        <div className="space-y-2 mb-8">
          {filteredSongs.length > 0 ? filteredSongs.map(song => {
             const isActive = currentSong?.id === song.id;
             const liked = isSongLiked(song.id);
             return (
              <div 
                key={song.id} 
                className={`flex items-center p-3 rounded-md hover:bg-white/10 transition group cursor-pointer ${isActive ? 'bg-white/5' : ''}`}
                onClick={() => playSong(song)}
              >
                <img src={song.coverUrl} className="w-10 h-10 object-cover rounded mr-4" alt={song.title} />
                <div className="flex-1">
                  <p className={`font-semibold ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikeSong(song);
                  }}
                  className="mr-4 opacity-0 group-hover:opacity-100 transition"
                >
                  <Heart className="w-5 h-5" fill={liked ? '#1db954' : 'none'} color={liked ? '#1db954' : 'gray'} />
                </button>
                <div className="text-sm text-gray-400 w-12 text-right mr-4">
                  {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            );
          }) : (
             <p className="text-gray-400">No results found for "{query}"</p>
          )}
        </div>
      )}

      {/* Categories Grid (Just UI) */}
      {!query && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {["Podcasts", "Made For You", "New Releases", "Pop", "Hip-Hop", "Rock", "Latin", "Chill"].map((cat, i) => (
             <div key={cat} className={`rounded-lg p-4 h-40 font-bold text-xl relative overflow-hidden`} style={{ backgroundColor: `hsl(${i * 45}, 70%, 40%)` }}>
                {cat}
                <div className="absolute w-20 h-20 bg-black/20 transform rotate-[25deg] -right-4 -bottom-4 shadow-lg"></div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
