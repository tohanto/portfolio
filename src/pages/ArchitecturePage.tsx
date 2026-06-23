import { useProjectData } from '@/hooks/useProjectData';
import { LazyImage } from '@/components/ui/LazyImage';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  '/01建筑设计/01轻宋产品手册/封面.png',
  '/01建筑设计/02社区活动中心/封面.png',
  '/01建筑设计/03室内设计/封面.png',
  '/01建筑设计/04绿色高层设计/封面1.png',
];

export default function ArchitecturePage() {
  const { getProjectsByCategory } = useProjectData();
  const projects = getProjectsByCategory('architecture');

  return (
    <div>
      {/* Hero carousel */}
      <div className="relative w-full h-[600px]">
        <ImageCarousel images={HERO_IMAGES} alt="建筑设计" height="600px" />
        <div className="absolute bottom-0 left-0 right-0 p-[60px] z-10 pointer-events-none">
          <div className="container-page">
            <h1 className="text-[72px] font-bold text-white leading-none" style={{ letterSpacing: '-2px' }}>
              建筑设计
            </h1>
            <p className="mt-2 text-lg text-white/60">
              探索空间与形态的无限可能
            </p>
          </div>
        </div>
      </div>

      {/* Project list — vertical stacked layout */}
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
                  建筑设计
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
