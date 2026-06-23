import { useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils/cn';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  containerClassName?: string;
}

export function LazyImage({ src, alt, className, aspectRatio, containerClassName }: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useIntersectionObserver({
    target: containerRef,
    onIntersect: () => setIsVisible(true),
    rootMargin: '600px',
    enabled: !isVisible,
  });

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-surface', containerClassName)}
      style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-surface" />
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-ink-muted text-xs">
          加载失败
        </div>
      ) : isVisible ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      ) : null}
    </div>
  );
}
