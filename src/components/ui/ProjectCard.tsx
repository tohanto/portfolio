import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types';
import { CoverMedia } from './CoverMedia';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  architecture: '建筑设计',
  games: '游戏设计',
  ai: 'AI辅助',
  art: '视觉艺术',
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/${project.category}/${project.id}`)}
      className={cn(
        'group cursor-pointer overflow-hidden bg-canvas-white border border-rule transition-all duration-300 hover:shadow-card-hover',
        className
      )}
    >
      {/* Image area */}
      <div className="aspect-[424/240] overflow-hidden bg-surface relative">
        <CoverMedia
          coverType={project.coverType}
          coverSrc={project.coverSrc}
          coverPoster={project.coverPoster}
          alt={project.title}
          containerClassName="w-full h-full"
          className="group-hover:scale-[1.03] transition-transform duration-500"
        />
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
