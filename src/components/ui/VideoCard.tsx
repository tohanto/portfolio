import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types';
import { cn } from '@/utils/cn';

interface VideoCardProps {
  project: Project;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  architecture: '建筑设计',
  games: '游戏设计',
  ai: 'AI辅助',
  art: '视觉艺术',
};

export function VideoCard({ project, className }: VideoCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/${project.category}/${project.id}`)}
      className={cn(
        'group cursor-pointer overflow-hidden bg-canvas-white border border-rule transition-all duration-300 hover:shadow-card-hover',
        className
      )}
    >
      {/* Video area */}
      <div className="aspect-[424/240] overflow-hidden relative bg-surface">
        {project.coverPoster ? (
          <img src={project.coverPoster} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-surface" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-canvas-white/90 shadow-sm transition-transform group-hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-signal ml-0.5">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="p-6">
        <span className="text-[13px] font-semibold text-signal uppercase" style={{ letterSpacing: '2px' }}>
          {CATEGORY_LABELS[project.category] || project.category}
        </span>
        <h3 className="mt-3 text-xl font-bold text-ink leading-[1.2]" style={{ letterSpacing: '-0.5px' }}>
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-ink-secondary leading-[1.6] line-clamp-2" style={{ fontSize: '14px' }}>
          {project.description}
        </p>
        <span className="inline-block mt-4 text-[10px] text-signal" style={{ letterSpacing: '1px' }}>
          查看全部
        </span>
      </div>
    </article>
  );
}
