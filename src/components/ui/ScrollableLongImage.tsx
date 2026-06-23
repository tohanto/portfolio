import { useRef, useCallback, useEffect } from 'react';
import { LazyImage } from './LazyImage';

interface ScrollableLongImageProps {
  src: string;
  alt: string;
  /** Max height of the scrollable viewport, default '70vh' */
  maxHeight?: string;
}

/**
 * A bordered container that shows a long image.
 * Mouse wheel inside the container scrolls the image vertically.
 * When scrolled to the bottom, the page resumes normal scrolling.
 * The "项目展示" heading stays fixed at top-left via the parent layout.
 */
export function ScrollableLongImage({ src, alt, maxHeight = '70vh' }: ScrollableLongImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // If scrolling down and not at bottom, capture scroll
    if (e.deltaY > 0 && !atBottom) {
      e.preventDefault();
      container.scrollTop += e.deltaY;
      return;
    }

    // If scrolling up and not at top, capture scroll
    if (e.deltaY < 0 && !atTop) {
      e.preventDefault();
      container.scrollTop += e.deltaY;
      return;
    }

    // At boundary — let page scroll naturally
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      className="border border-rule bg-canvas-white overflow-y-auto"
      style={{
        maxHeight,
        scrollbarGutter: 'stable',
      }}
    >
      <LazyImage
        src={src}
        alt={alt}
        containerClassName="w-full"
        className="w-full"
      />
    </div>
  );
}
