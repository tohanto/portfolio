import { useState, useCallback } from 'react';
import type { ArtItem } from '@/types';
import { LazyImage } from './LazyImage';
import { cn } from '@/utils/cn';

interface MasonryGridProps {
  items: ArtItem[];
  className?: string;
}

/* Lightbox modal */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
        aria-label="关闭"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function MasonryGrid({ items, className }: MasonryGridProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  if (items.length === 0) {
    return <div className="text-center py-20 text-ink-muted text-sm">暂无作品</div>;
  }

  return (
    <>
      {/* CSS columns masonry: images flow naturally, each at its own height */}
      <div className={cn(
        'columns-2 sm:columns-3 lg:columns-4 gap-4',
        className
      )}>
        {items.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(item.src)}
          >
            <LazyImage
              src={item.src}
              alt={item.alt}
              containerClassName="w-full"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} alt="" onClose={closeLightbox} />
      )}
    </>
  );
}
