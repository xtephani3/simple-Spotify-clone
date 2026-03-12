"use client";

import React from 'react';
import Link from 'next/link';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Heart } from 'lucide-react';

export default function Library() {
  const { customPlaylists, likedSongs } = useLibraryStore();

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32 w-full text-white bg-[#121212]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        
        {/* Liked Songs Tile */}
        <Link 
          href="/liked" 
          className="col-span-2 relative h-64 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-md p-6 flex flex-col justify-end overflow-hidden group hover:scale-[1.02] transition duration-300"
        >
          <div className="z-10 relative">
            <h2 className="text-3xl font-bold mb-4">Liked Songs</h2>
            <p className="font-semibold text-white/80">{likedSongs.length} liked songs</p>
          </div>
          <Heart className="absolute -right-8 -bottom-8 w-48 h-48 text-white opacity-20 group-hover:opacity-30 transition transform group-hover:scale-110" />
        </Link>

        {/* Custom Playlists */}
        {customPlaylists.map(playlist => (
          <Link 
            key={playlist.id} 
            href={`/playlist/${playlist.id}`}
            className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition cursor-pointer group flex flex-col"
          >
            <div className="relative w-full aspect-square mb-4 shadow-lg rounded-md overflow-hidden">
              <img src={playlist.coverUrl} alt={playlist.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold mb-1 truncate text-white">
              {playlist.name}
            </h3>
            <p className="text-sm text-[#b3b3b3]">By You • {playlist.songs.length} songs</p>
          </Link>
        ))}

        {customPlaylists.length === 0 && (
          <div className="col-span-2 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-md p-6 text-gray-400 h-64 flex-col gap-2">
            <p>You haven't created any custom playlists yet.</p>
            <p className="text-sm">Click "Create Playlist" in the sidebar to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
