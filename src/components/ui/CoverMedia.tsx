import type { CoverType } from '@/types';
import { LazyImage } from './LazyImage';
import { cn } from '@/utils/cn';

interface CoverMediaProps {
  coverType: CoverType;
  coverSrc: string;
  coverPoster?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function CoverMedia({ coverType, coverSrc, coverPoster, alt, className, containerClassName }: CoverMediaProps) {
  if (coverType === 'video') {
    return (
      <div className={cn('relative overflow-hidden bg-surface flex items-center justify-center', containerClassName)}>
        {coverPoster && <img src={coverPoster} alt={alt} className="w-full h-full object-cover" loading="lazy" />}
        <div className={cn('absolute inset-0 flex items-center justify-center', coverPoster ? 'bg-ink/10' : '')}>
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-canvas-white/90 shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-signal ml-0.5"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </div>
      </div>
    );
  }
  return <LazyImage src={coverSrc} alt={alt} className={className} containerClassName={containerClassName} />;
}
