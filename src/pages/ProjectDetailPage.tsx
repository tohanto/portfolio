import { useRef, useState, useCallback, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useProjectData } from '@/hooks/useProjectData';
import type { Category, AITab, DetailVideo, DetailImage } from '@/types';
import { LazyImage } from '@/components/ui/LazyImage';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ScrollableLongImage } from '@/components/ui/ScrollableLongImage';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { ContactModule } from '@/components/ui/ContactModule';

const VALID_CATEGORIES: Category[] = ['architecture', 'games', 'ai', 'art'];

/* ── Section heading ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[32px] font-bold text-ink mb-8" style={{ letterSpacing: '-1px' }}>
      {children}
    </h2>
  );
}

/* ── Autoplay video (muted, loop, for hero) ── */
function AutoplayVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

/* ── Click-to-play video card with full controls ── */
function ClickToPlayVideo({ video }: { video: DetailVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Once the video element mounts after isPlaying flips to true, start playback
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      const v = videoRef.current;
      v.play().catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className="rounded overflow-hidden bg-surface border border-rule">
      <div className="relative bg-surface" style={{ aspectRatio: '16/9' }}>
        {/* Poster + play button overlay (always present but hidden when playing) */}
        {!isPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
            {video.poster && <img src={video.poster} alt={video.title} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-signal ml-0.5">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* Video element always rendered so the ref is available; hidden until play */}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls={isPlaying}
          playsInline
          preload="metadata"
          className="w-full h-full"
          style={{ display: isPlaying ? 'block' : 'none' }}
        />
      </div>
      <p className="p-4 text-[13px] text-ink-secondary font-medium">
        {video.link ? (
          <>
            {video.title.replace(video.linkText || '', '')}
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline hover:text-signal-hover"
            >
              {video.linkText}
            </a>
          </>
        ) : (
          video.title
        )}
      </p>
    </div>
  );
}

/* ── Detail image card (optionally clickable) ── */
function DetailImageCard({ img }: { img: DetailImage }) {
  const inner = (
    <>
      <LazyImage src={img.src} alt={img.alt} containerClassName="w-full" />
      <p className="p-4 text-[13px] text-ink-secondary">{img.alt}</p>
    </>
  );

  if (img.link) {
    return (
      <a
        href={img.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded overflow-hidden bg-surface border border-rule hover:border-signal transition-colors cursor-pointer"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="rounded overflow-hidden bg-surface border border-rule">
      {inner}
    </div>
  );
}

/* ── AI Comparison tab content ── */
function AIComparisonContent({ tab }: { tab: AITab }) {
  return (
    <div className="space-y-8">
      {tab.items.map((item, i) => {
        if (item.type === 'comparison' && item.beforeSrc && item.afterSrc) {
          return (
            <BeforeAfterSlider
              key={i}
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
              beforeLabel={item.beforeLabel}
              afterLabel={item.afterLabel}
            />
          );
        }
        if (item.type === 'image' && item.src) {
          return (
            <div key={i} className="rounded overflow-hidden bg-surface border border-rule">
              <LazyImage src={item.src} alt={item.alt || ''} containerClassName="w-full" />
              {item.alt && <p className="p-4 text-[13px] text-ink-secondary">{item.alt}</p>}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
 * ProjectDetailPage — handles all layout variants
 * ══════════════════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const { getProjectById } = useProjectData();

  if (!category || !VALID_CATEGORIES.includes(category as Category)) {
    return <Navigate to="/" replace />;
  }

  const validCategory = category as Category;
  const project = id ? getProjectById(validCategory, id) : undefined;

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-ink mb-3">项目未找到</h1>
        <p className="text-ink-secondary text-sm mb-8">抱歉，您要查看的项目不存在或已被移除。</p>
        <Link to="/" className="h-12 w-40 inline-flex items-center justify-center bg-ink text-ink-inverse text-[13px] font-semibold hover:bg-ink/90 transition-colors" style={{ letterSpacing: '1px' }}>
          返回首页
        </Link>
      </div>
    );
  }

  const heroMode = project.heroMode || project.coverType;

  return (
    <div>
      {/* ═══════════ Hero Section ═══════════ */}
      {heroMode === 'carousel' && project.heroImages && project.heroImages.length > 0 ? (
        <div className="relative w-full h-[60vh] min-h-[420px]">
          <ImageCarousel images={project.heroImages} alt={project.title} />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 z-10 pointer-events-none">
            <div className="container-page">
              <p className="text-xs text-white/60 uppercase tracking-[0.15em] mb-2">{categoryLabel(validCategory)}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{project.title}</h1>
              <p className="mt-3 text-base text-white/75 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </div>
      ) : heroMode === 'video' && project.heroVideo ? (
        <div className="relative w-full h-[60vh] min-h-[420px] bg-surface overflow-hidden">
          <AutoplayVideo src={project.heroVideo} poster={project.heroVideoPoster} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="container-page">
              <p className="text-xs text-white/60 uppercase tracking-[0.15em] mb-2">{categoryLabel(validCategory)}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{project.title}</h1>
              <p className="mt-3 text-base text-white/75 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Default: single image hero */
        <div className="relative w-full h-[60vh] min-h-[420px] bg-surface overflow-hidden">
          <LazyImage src={project.coverSrc} alt={project.title} containerClassName="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="container-page">
              <p className="text-xs text-white/60 uppercase tracking-[0.15em] mb-2">{categoryLabel(validCategory)}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{project.title}</h1>
              <p className="mt-3 text-base text-white/75 max-w-2xl">{project.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ Detail Section ═══════════ */}
      <div className="container-page" style={{ padding: '80px 0' }}>
        {project.detailLayout === 'longImage' && project.longImage ? (
          <>
            <SectionHeading>项目展示</SectionHeading>
            <ScrollableLongImage src={project.longImage} alt={project.title} />
            {project.detail.pdfUrl && (
              <div className="mt-8 text-center">
                <a href={project.detail.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 border border-rule text-[13px] font-medium text-ink-secondary hover:text-ink hover:border-ink/30 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  查看完整文档 (PDF)
                </a>
              </div>
            )}
          </>
        ) : project.detailLayout === 'videos+longImage' ? (
          <>
            <SectionHeading>项目展示</SectionHeading>
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Detail videos with click-to-play and controls */}
              {project.detailVideos?.map((v, i) => (
                <ClickToPlayVideo key={i} video={v} />
              ))}
              {/* Detail images */}
              {project.detailImages?.map((img, i) => (
                <DetailImageCard key={i} img={img} />
              ))}
            </div>
            {/* Long image after videos */}
            {project.longImage && (
              <div className="mt-12">
                <ScrollableLongImage src={project.longImage} alt={project.title} />
              </div>
            )}
            {project.detail.pdfUrl && (
              <div className="mt-8 text-center">
                <a href={project.detail.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 border border-rule text-[13px] font-medium text-ink-secondary hover:text-ink hover:border-ink/30 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  查看完整文档 (PDF)
                </a>
              </div>
            )}
          </>
        ) : project.detailLayout === 'images' ? (
          <>
            <SectionHeading>项目展示</SectionHeading>
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Videos first (讲解视频) */}
              {project.detailVideos?.map((v, i) => (
                <ClickToPlayVideo key={`v-${i}`} video={v} />
              ))}
              {/* Images (optionally clickable) */}
              {project.detailImages?.map((img, i) => (
                <DetailImageCard key={`img-${i}`} img={img} />
              ))}
            </div>
          </>
        ) : project.detailLayout === 'aiComparison' && project.aiTabs ? (
          <AIDetailSection tabs={project.aiTabs} />
        ) : (
          /* Fallback: original screenshots layout */
          <>
            <SectionHeading>项目展示</SectionHeading>
            <div className="space-y-8 max-w-4xl mx-auto">
              {project.detail.screenshots.map((s, i) => (
                <div key={i} className="rounded overflow-hidden bg-surface border border-rule">
                  <LazyImage src={s.src} alt={s.alt} aspectRatio={16/9} containerClassName="w-full" />
                  <p className="p-4 text-[13px] text-ink-secondary">{s.alt}</p>
                </div>
              ))}
            </div>
            {project.detail.pdfUrl && (
              <div className="mt-8 text-center">
                <a href={project.detail.pdfUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 border border-rule text-[13px] font-medium text-ink-secondary hover:text-ink hover:border-ink/30 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  查看完整文档 (PDF)
                </a>
              </div>
            )}
          </>
        )}
      </div>

      <ContactModule variant="section" />
    </div>
  );
}

/* ── AI Detail with tabs ── */
function AIDetailSection({ tabs }: { tabs: AITab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '全部');
  const activeTabData = tabs.find((t) => t.key === activeTab) || tabs[0];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading>项目展示</SectionHeading>
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`h-8 px-4 text-[13px] font-medium transition-colors ${activeTab === tab.key ? 'bg-ink text-white' : 'border border-rule text-ink-secondary hover:text-ink hover:border-ink/30'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeTabData && <AIComparisonContent tab={activeTabData} />}
    </>
  );
}

function categoryLabel(c: Category): string {
  const map: Record<Category, string> = { architecture: '建筑设计', games: '游戏设计', ai: 'AI 辅助', art: '视觉艺术' };
  return map[c];
}
