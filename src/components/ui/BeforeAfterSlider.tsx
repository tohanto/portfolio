import { useRef, useState, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

/**
 * A side-by-side image comparison slider.
 * Left half shows the "after" image, right half shows the "before" image.
 * A draggable vertical divider separates them.
 */
export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage from left
  const [isDragging, setIsDragging] = useState(false);

  const getClientX = useCallback((e: MouseEvent | React.MouseEvent) => e.clientX, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, [isDragging]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-surface border border-rule select-none ${className ?? ''}`}
      style={{ aspectRatio: '16/10', cursor: isDragging ? 'ew-resize' : 'default' }}
    >
      {/* After image (left side, clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={afterSrc} alt={afterLabel} className="w-full h-full object-cover" draggable={false} />
        <span className="absolute top-4 left-4 bg-black/60 text-white text-[11px] px-2 py-1 rounded" style={{ letterSpacing: '1px' }}>
          {afterLabel}
        </span>
      </div>

      {/* Before image (right side, clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img src={beforeSrc} alt={beforeLabel} className="w-full h-full object-cover" draggable={false} />
        <span className="absolute top-4 right-4 bg-black/60 text-white text-[11px] px-2 py-1 rounded" style={{ letterSpacing: '1px' }}>
          {beforeLabel}
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        onMouseDown={onMouseDown}
      >
        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-ink/10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
