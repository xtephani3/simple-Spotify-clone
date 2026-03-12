"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

export default function Player() {
  const { currentSong, isPlaying, volume, togglePlay, playNext, playPrevious, setVolume } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Sync state to audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const current = audioRef.current.currentTime;
      setProgress((current / currentSong.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current && currentSong) {
      audioRef.current.currentTime = (val / 100) * currentSong.duration;
      setProgress(val);
    }
  };

  if (!currentSong) return null; // Don't show player if nothing is playing or queued

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-50">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />
      
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img src={currentSong.coverUrl} alt="Cover" className="h-14 w-14 rounded shadow-lg" />
        <div>
          <h4 className="text-white text-sm font-semibold hover:underline cursor-pointer">{currentSong.title}</h4>
          <p className="text-[#b3b3b3] text-xs hover:underline cursor-pointer hover:text-white">{currentSong.artist}</p>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-[722px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-[#b3b3b3] hover:text-white transition"><Shuffle className="w-5 h-5" /></button>
          <button onClick={playPrevious} className="text-[#b3b3b3] hover:text-white transition"><SkipBack className="w-5 h-5" fill="currentColor" /></button>
          
          <button 
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
          >
            {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-1" fill="currentColor" />}
          </button>
          
          <button onClick={playNext} className="text-[#b3b3b3] hover:text-white transition"><SkipForward className="w-5 h-5" fill="currentColor" /></button>
          <button className="text-[#b3b3b3] hover:text-white transition"><Repeat className="w-5 h-5" /></button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 group">
          <span className="text-xs text-[#b3b3b3]">0:00</span>
          <div className="w-full relative h-1 bg-[#4d4d4d] rounded-full flex items-center">
            <input 
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-white group-hover:bg-[#1db954] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            {/* The little thumb indicator */}
            <div 
              className="w-3 h-3 bg-white rounded-full absolute hidden group-hover:block transition-all shadow"
              style={{ left: `calc(${progress}% - 6px)` }}
            ></div>
          </div>
          <span className="text-xs text-[#b3b3b3]">
             {Math.floor(currentSong.duration / 60)}:{(currentSong.duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center justify-end w-1/3 gap-3">
        <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-[#b3b3b3] hover:text-white transition">
          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="w-24 group flex items-center relative h-1 bg-[#4d4d4d] rounded-full cursor-pointer">
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="h-full bg-white group-hover:bg-[#1db954] rounded-full"
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
