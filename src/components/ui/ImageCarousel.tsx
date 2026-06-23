import { useState, useEffect, useCallback } from 'react';
import { LazyImage } from './LazyImage';

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  interval?: number; // ms between auto-advance, default 4000
  height?: string;   // default '600px'
  className?: string;
}

export function ImageCarousel({ images, alt = '', interval = 4000, height = '600px', className }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % images.length);
  }, [current, images.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length);
  }, [current, images.length, goTo]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, images.length]);

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden bg-surface ${className ?? ''}`} style={{ height }}>
      {/* Images */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
        >
          <LazyImage
            src={src}
            alt={`${alt} ${i + 1}`}
            containerClassName="w-full h-full"
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors backdrop-blur-sm"
            aria-label="上一张"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors backdrop-blur-sm"
            aria-label="下一张"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`第 ${i + 1} 张`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
