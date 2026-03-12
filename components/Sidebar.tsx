import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="h-full w-60 bg-black text-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Spotify Clone</h1>
      </div>
      
      <div className="space-y-4 text-gray-300">
        <button className="flex items-center gap-4 hover:text-white transition w-full">
          <Home className="w-6 h-6" />
          <span className="font-semibold">Home</span>
        </button>
        <button className="flex items-center gap-4 hover:text-white transition w-full">
          <Search className="w-6 h-6" />
          <span className="font-semibold">Search</span>
        </button>
        <button className="flex items-center gap-4 hover:text-white transition w-full">
          <Library className="w-6 h-6" />
          <span className="font-semibold">Your Library</span>
        </button>
      </div>

      <div className="mt-8 space-y-4 text-gray-300">
        <button className="flex items-center gap-4 hover:text-white transition w-full">
          <div className="bg-gray-300 p-1 text-black rounded-sm">
            <PlusSquare className="w-4 h-4" />
          </div>
          <span className="font-semibold">Create Playlist</span>
        </button>
        <button className="flex items-center gap-4 hover:text-white transition w-full">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-400 p-1 rounded-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold">Liked Songs</span>
        </button>
      </div>

      <hr className="border-gray-800 my-6" />
      
      {/* Mock Playlists */}
      <div className="space-y-3 overflow-y-auto text-sm text-gray-300 hover:text-white">
        <p className="cursor-pointer">Chill Lofi Beats</p>
        <p className="cursor-pointer">Deep Focus</p>
        <p className="cursor-pointer">Coding Mix</p>
        <p className="cursor-pointer">Top 50 - Global</p>
      </div>
    </div>
  );
}
