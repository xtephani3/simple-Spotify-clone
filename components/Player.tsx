"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

export default function Player() {
  const {
    currentSong,
    isPlaying,
    volume,
    isShuffled,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    toggleShuffle,
    cycleRepeatMode,
  } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastNonZeroVolumeRef = useRef(1);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  useEffect(() => {
    if (volume > 0) {
      lastNonZeroVolumeRef.current = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!currentSong) return;
    setProgress(0);
    setBuffered(0);
    setCurrentTime(0);
    setDuration(currentSong.duration || 0);
    setHasError(false);
    setIsLoading(true);
  }, [currentSong]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentSong) return;
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isEditable =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target?.isContentEditable;
      if (isEditable || e.metaKey || e.ctrlKey || e.altKey) return;

      const audio = audioRef.current;
      if (!audio) return;

      const clamp = (value: number, min: number, max: number) =>
        Math.min(max, Math.max(min, value));
      const seekBy = (seconds: number) => {
        const nextTime = clamp(audio.currentTime + seconds, 0, duration || audio.duration || 0);
        audio.currentTime = nextTime;
        setCurrentTime(nextTime);
        setProgress(duration ? (nextTime / duration) * 100 : 0);
      };

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          e.preventDefault();
          togglePlay();
          break;
        case "j":
        case "J":
          e.preventDefault();
          seekBy(-10);
          break;
        case "l":
        case "L":
          e.preventDefault();
          seekBy(10);
          break;
        case "ArrowLeft":
          e.preventDefault();
          seekBy(-5);
          break;
        case "ArrowRight":
          e.preventDefault();
          seekBy(5);
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.05));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.05));
          break;
        case "m":
        case "M":
          e.preventDefault();
          if (volume === 0) {
            setVolume(lastNonZeroVolumeRef.current || 1);
          } else {
            lastNonZeroVolumeRef.current = volume;
            setVolume(0);
          }
          break;
        case "n":
        case "N":
          e.preventDefault();
          playNext();
          break;
        case "p":
        case "P":
          e.preventDefault();
          playPrevious();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSong, duration, playNext, playPrevious, setVolume, togglePlay, volume]);

  const formatTime = (timeInSeconds: number) => {
    if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const current = audioRef.current.currentTime;
      const baseDuration = duration || currentSong.duration;
      setCurrentTime(current);
      setProgress(baseDuration ? (current / baseDuration) * 100 : 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current && currentSong) {
      const baseDuration = duration || currentSong.duration;
      audioRef.current.currentTime = (val / 100) * baseDuration;
      setProgress(val);
      setCurrentTime((val / 100) * baseDuration);
    }
  };

  const handleProgress = () => {
    const audio = audioRef.current;
    const baseDuration = duration || currentSong?.duration || 0;
    if (!audio || !baseDuration) return;
    if (audio.buffered.length === 0) {
      setBuffered(0);
      return;
    }
    const end = audio.buffered.end(audio.buffered.length - 1);
    setBuffered(Math.min(100, (end / baseDuration) * 100));
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextDuration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : currentSong?.duration || 0;
    setDuration(nextDuration);
    setIsLoading(false);
    setHasError(false);
    handleProgress();
  };

  const handleEnded = () => {
    if (repeatMode === "one" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Playback failed", e));
      return;
    }
    playNext();
  };

  const handleMuteToggle = () => {
    if (volume === 0) {
      setVolume(lastNonZeroVolumeRef.current || 1);
      return;
    }
    lastNonZeroVolumeRef.current = volume;
    setVolume(0);
  };

  const statusLabel = hasError ? "Playback error" : isLoading ? "Loading..." : formatTime(currentTime);

  if (!currentSong) return null; // Don't show player if nothing is playing or queued

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-50">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onLoadStart={() => {
          setIsLoading(true);
          setHasError(false);
        }}
        onCanPlay={() => setIsLoading(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onEnded={handleEnded}
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
          <button
            onClick={toggleShuffle}
            aria-pressed={isShuffled}
            aria-label="Toggle shuffle"
            title={isShuffled ? "Shuffle on" : "Shuffle off"}
            className={`transition ${isShuffled ? "text-[#1db954]" : "text-[#b3b3b3] hover:text-white"}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button onClick={playPrevious} aria-label="Previous track" className="text-[#b3b3b3] hover:text-white transition">
            <SkipBack className="w-5 h-5" fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-1" fill="currentColor" />}
          </button>
          
          <button onClick={playNext} aria-label="Next track" className="text-[#b3b3b3] hover:text-white transition">
            <SkipForward className="w-5 h-5" fill="currentColor" />
          </button>
          <button
            onClick={cycleRepeatMode}
            aria-pressed={repeatMode !== "off"}
            aria-label="Change repeat mode"
            title={
              repeatMode === "one" ? "Repeat one" : repeatMode === "all" ? "Repeat all" : "Repeat off"
            }
            className={`transition ${
              repeatMode === "off" ? "text-[#b3b3b3] hover:text-white" : "text-[#1db954]"
            }`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 group">
          <span className="text-xs text-[#b3b3b3] w-12">{statusLabel}</span>
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
              className="h-full bg-[#7b7b7b] rounded-full absolute"
              style={{ width: `${buffered}%` }}
            ></div>
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
             {formatTime(duration || currentSong.duration)}
          </span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center justify-end w-1/3 gap-3">
        <button onClick={handleMuteToggle} aria-label={volume === 0 ? "Unmute" : "Mute"} className="text-[#b3b3b3] hover:text-white transition">
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
