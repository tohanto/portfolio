import { useProjectData } from '@/hooks/useProjectData';
import { LazyImage } from '@/components/ui/LazyImage';
import { Link } from 'react-router-dom';
import { assetPath } from '@/utils/assetPath';

export default function AIPage() {
  const { getProjectsByCategory } = useProjectData();
  const projects = getProjectsByCategory('ai');

  return (
    <div>
      {/* Hero image */}
      <div className="relative w-full h-[600px] bg-surface overflow-hidden">
        <LazyImage
          src={assetPath("/03AI辅助/sunshine/01封面.webp")}
          alt="AI辅助"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-[60px]">
          <div className="container-page">
            <h1 className="text-[72px] font-bold text-white leading-none" style={{ letterSpacing: '-2px' }}>
              AI辅助
            </h1>
            <p className="mt-2 text-lg text-white/60">
              将人工智能融入创意工作流
            </p>
          </div>
        </div>
      </div>

      {/* Project list — now 2 projects (recruitment + combined AI image) */}
      <div className="container-page" style={{ padding: '80px 60px' }}>
        <div className="flex flex-col" style={{ gap: '32px' }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/${project.category}/${project.id}`}
              className="flex max-md:flex-col border border-rule bg-canvas-white hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="w-[424px] shrink-0 max-md:w-full h-[240px] bg-surface overflow-hidden relative">
                <LazyImage
                  src={project.coverSrc}
                  alt={project.title}
                  containerClassName="w-full h-full"
                  className="hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-center p-8">
                <span
                  className="text-[13px] font-semibold text-signal uppercase"
                  style={{ letterSpacing: '2px' }}
                >
                  AI辅助
                </span>
                <h3
                  className="mt-3 text-xl font-bold text-ink leading-[1.2]"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-2 text-sm text-ink-secondary leading-[1.6] max-w-[340px]"
                  style={{ fontSize: '14px' }}
                >
                  {project.description}
                </p>
                <span
                  className="inline-block mt-4 text-[10px] text-signal"
                  style={{ letterSpacing: '1px' }}
                >
                  查看详情
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
