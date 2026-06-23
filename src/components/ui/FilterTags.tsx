import type { ArtFilter } from '@/types';
import { cn } from '@/utils/cn';

interface FilterTagsProps {
  options: ArtFilter[];
  active: ArtFilter;
  onChange: (filter: ArtFilter) => void;
  className?: string;
}

export function FilterTags({ options, active, onChange, className }: FilterTagsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            'px-4 py-2 text-[13px] font-medium rounded-full border transition-all duration-200',
            active === option
              ? 'bg-ink text-ink-inverse border-ink'
              : 'bg-transparent text-ink-secondary border-rule hover:border-ink/20 hover:text-ink'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
