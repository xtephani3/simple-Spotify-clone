"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { useLibraryStore } from '../../../store/useLibraryStore';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { Play } from 'lucide-react';
import { playlists as defaultPlaylists } from '../../../lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PlaylistPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { customPlaylists } = useLibraryStore();
  const { playSong, setPlaylist, currentSong, isPlaying } = usePlayerStore();

  // Find playlist in custom first, then in defaults
  const playlist = customPlaylists.find(p => p.id === resolvedParams.id) || 
                   defaultPlaylists.find(p => p.id === resolvedParams.id);

  if (!playlist) {
    notFound();
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      setPlaylist(playlist.songs);
      playSong(playlist.songs[0]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 w-full text-white bg-gradient-to-b from-[#b3b3b3]/20 to-[#121212]">
      {/* Header */}
      <div className="flex items-end gap-6 mb-8 mt-12">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="w-48 h-48 object-cover shadow-2xl" 
        />
        <div>
          <p className="text-sm font-semibold mb-2">Playlist</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 truncate max-w-2xl">{playlist.name}</h1>
          <p className="text-sm text-gray-300 font-semibold mb-2">{playlist.description}</p>
          <p className="text-xs text-gray-400">{playlist.songs.length} songs</p>
        </div>
      </div>

      {/* Controls */}
      {playlist.songs.length > 0 && (
        <div className="mb-8 flex items-center gap-6">
          <button 
            onClick={handlePlayAll}
            className="bg-[#1db954] text-black w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition shadow-xl"
          >
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Songs List */}
      <div className="mt-8 pt-4">
        {playlist.songs.length === 0 ? (
           <div className="text-gray-400 mt-10 p-6 bg-white/5 rounded-lg text-center">
             <h2 className="text-xl font-bold text-white mb-2">It's a bit empty here...</h2>
             <p>Use Search to find songs and add them to your playlists! (Well, maybe in the next update 😉)</p>
           </div>
        ) : (
          <div className="space-y-1 mt-4">
            <div className="grid grid-cols-[32px_1fr_48px] gap-4 mb-2 text-gray-400 text-sm px-4 border-b border-white/10 pb-2">
              <span>#</span>
              <span>Title</span>
              <span className="text-right">Time</span>
            </div>
            {playlist.songs.map((song, idx) => {
              const isActive = currentSong?.id === song.id;
              return (
                <div 
                  key={song.id} 
                  className={`grid grid-cols-[32px_1fr_48px] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition group cursor-pointer px-4 ${isActive ? 'bg-white/5' : ''}`}
                  onClick={() => playSong(song)}
                >
                  <div className="flex justify-center w-4 text-gray-400 relative">
                     {isActive && isPlaying ? (
                       <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="playing" className="w-4 h-4" />
                     ) : (
                       <span className={`group-hover:hidden ${isActive ? 'text-[#1db954]' : ''}`}>{idx + 1}</span>
                     )}
                     <Play className="w-4 h-4 absolute hidden group-hover:block" fill="white" />
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={song.coverUrl} alt={song.title} className="h-10 w-10 object-cover rounded" />
                    <div>
                      <p className={`font-semibold ${isActive ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</p>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 text-right">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
