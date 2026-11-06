'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/seed-data';

export function VideoReelCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <div className="max-w-[300px] sm:max-w-[360px] mx-auto lg:max-w-none bg-white border border-[#DCDCD4] p-2.5 sm:p-4">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFEFEA] text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#4A4D52]">
        <span>Video Lapangan</span>
        <span className="text-[#141517] font-bold">Bandung, ID</span>
      </div>

      <div className="relative aspect-[9/14] w-full bg-[#141517] overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/geesthart-reel.mp4"
          width={720}
          height={1120}
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Accessible Pause / Play & Audio Controls (>= 44x44px per R-03 & R-39) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Jeda video dokumentasi' : 'Putar video dokumentasi'}
            className="min-h-[40px] sm:min-h-[44px] px-3 bg-[#141517]/90 hover:bg-[#141517] text-white border border-white/25 text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Putar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Nyalakan suara video' : 'Matikan suara video'}
            className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] bg-[#141517]/90 hover:bg-[#141517] text-white border border-white/25 inline-flex items-center justify-center transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="pt-2.5 flex items-center justify-between text-[11px] sm:text-xs">
        <span className="font-bold text-[#141517] truncate">
          Reel Koleksi Geesthart
        </span>
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[32px] inline-flex items-center gap-1 text-[#3F4734] font-bold hover:underline shrink-0"
        >
          <span>{SITE_CONFIG.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
