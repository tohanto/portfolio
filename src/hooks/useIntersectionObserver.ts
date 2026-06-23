import { useEffect, type RefObject } from 'react';

interface UseIOptions {
  target: RefObject<HTMLElement | null>;
  onIntersect?: () => void;
  onLeave?: () => void;
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  onLeave,
  rootMargin = '200px',
  threshold = 0,
  enabled = true,
}: UseIOptions) {
  useEffect(() => {
    const el = target.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect?.();
        } else {
          onLeave?.();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, onIntersect, onLeave, rootMargin, threshold, enabled]);
}
