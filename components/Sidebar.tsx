"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { customPlaylists, createPlaylist } = useLibraryStore();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Your Library', href: '/library', icon: Library },
  ];

  return (
    <div className="h-full w-60 bg-black text-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Spotify Clone</h1>
      </div>
      
      <div className="space-y-4 text-gray-300">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href} className={`flex items-center gap-4 hover:text-white transition w-full ${isActive ? 'text-white' : ''}`}>
              <Icon className="w-6 h-6" />
              <span className="font-semibold">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 space-y-4 text-gray-300">
        <button onClick={() => {
          const name = prompt('Enter playlist name:');
          if (name) createPlaylist(name);
          else createPlaylist();
        }} className="flex items-center gap-4 hover:text-white transition w-full">
          <div className="bg-gray-300 p-1 text-black rounded-sm">
            <PlusSquare className="w-4 h-4" />
          </div>
          <span className="font-semibold">Create Playlist</span>
        </button>
        <Link href="/liked" className={`flex items-center gap-4 hover:text-white transition w-full ${pathname === '/liked' ? 'text-white' : ''}`}>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-400 p-1 rounded-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold">Liked Songs</span>
        </Link>
      </div>

      <hr className="border-gray-800 my-6" />
      
      {/* Mock Playlists */}
      <div className="space-y-3 overflow-y-auto text-sm text-gray-300 custom-scrollbar">
        {customPlaylists.map(playlist => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="block cursor-pointer hover:text-white truncate">
            {playlist.name}
          </Link>
        ))}
        {customPlaylists.length === 0 && (
          <p className="text-xs text-gray-500 italic">No custom playlists yet</p>
        )}
      </div>
    </div>
  );
}
