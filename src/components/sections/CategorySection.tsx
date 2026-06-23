import { Link } from 'react-router-dom';
import type { Category } from '@/types';
import { useProjectData } from '@/hooks/useProjectData';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { VideoCard } from '@/components/ui/VideoCard';

interface CategorySectionProps {
  category: Category;
  label: string;
  description: string;
  limit?: number;
}

export function CategorySection({ category, label, description, limit = 3 }: CategorySectionProps) {
  const { getProjectsByCategory } = useProjectData();
  const projects = getProjectsByCategory(category).slice(0, limit);
  const isGames = category === 'games';

  if (projects.length === 0) return null;

  return (
    <section className="scroll-mt-header" style={{ padding: '80px 60px' }}>
      {/* Section header — matching Pixso 2:31: space-between */}
      <div className="flex items-end justify-between mb-12">
        {/* Left title group — matching Pixso 2:32: vertical, gap 8px */}
        <div>
          {/* Eyebrow: 10px Semi Bold, #999, letter-spacing 2px */}
          <span className="text-[10px] font-semibold text-ink-muted uppercase" style={{ letterSpacing: '2px' }}>
            SELECTED WORKS
          </span>
          {/* Title: 36px Bold, #111, letter-spacing -1px */}
          <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
            {label}
          </h2>
          <p className="mt-2 text-[15px] text-ink-secondary">
            {description}
          </p>
        </div>
        {/* "查看全部" link: 13px, #CC6600, letter-spacing 1px */}
        <Link
          to={`/${category}`}
          className="text-[13px] text-signal hover:text-signal-hover transition-colors shrink-0"
          style={{ letterSpacing: '1px' }}
        >
          查看全部
        </Link>
      </div>

      {/* 3-card row — matching Pixso 2:34: horizontal, gap 24px */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) =>
          isGames ? (
            <VideoCard key={p.id} project={p} />
          ) : (
            <ProjectCard key={p.id} project={p} />
          )
        )}
      </div>
    </section>
  );
}
