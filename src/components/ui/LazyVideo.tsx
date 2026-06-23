import { useRef, useState, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils/cn';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
}

export function LazyVideo({ src, poster, className, containerClassName }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  useIntersectionObserver({
    target: containerRef,
    onIntersect: () => setIsInView(true),
    onLeave: () => { setIsInView(false); videoRef.current?.pause(); setIsPlaying(false); },
    rootMargin: '200px',
  });

  const attemptPlay = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setShowPoster(false);
    } catch { setShowPoster(true); }
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) attemptPlay();
  }, [isInView, attemptPlay]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden bg-surface', containerClassName)}>
      {showPoster && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface cursor-pointer" onClick={() => { if (videoRef.current) { videoRef.current.muted = true; attemptPlay(); } }}>
          {poster && <img src={poster} alt="video cover" className="w-full h-full object-cover" />}
          <div className={cn('absolute inset-0 flex items-center justify-center', poster ? 'bg-ink/10' : '')}>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-canvas-white/90 shadow-sm transition-transform hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-signal ml-0.5"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </div>
        </div>
      )}
      {isInView && (
        <video ref={videoRef} src={src} poster={poster} autoPlay muted loop playsInline preload="none"
          className={cn('w-full h-full object-cover transition-opacity duration-500', isPlaying ? 'opacity-100' : 'opacity-0', className)}
        />
      )}
    </div>
  );
}
