import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({ title, subtitle, className, id }: SectionHeadingProps) {
  return (
    <div id={id} className={cn('mb-12', className)}>
      <h2 className="text-[36px] font-bold text-ink leading-[1.1]" style={{ letterSpacing: '-1px' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[15px] text-ink-secondary max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
