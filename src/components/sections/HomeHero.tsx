import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SplitText from '@/components/ui/SplitText';
import { assetPath } from '@/utils/assetPath';

const HERO_IMAGES = [
  assetPath('/01建筑设计/04绿色高层设计/封面2.png'),
  assetPath('/02游戏设计/shining/封面.png'),
  assetPath('/03AI辅助/sunshine/01封面.jpg'),
  assetPath('/04视觉艺术/海报设计/文创海报.png'),
];

/* object-position for each image — shift content toward its visible clip wedge */
const IMAGE_POSITIONS = [
  '15% center',
  '38% center',
  '62% center',
  '85% center',
];

/* Diagonal clip-paths for 4-image seamless tiling.
   Evenly split at 25% / 50% / 75% (top edge), seams slant ~8% left at bottom.
   All edges meet perfectly — no gaps between images. */
const CLIP_PATHS = [
  'polygon(0 0, 25% 0, 17% 100%, 0 100%)',
  'polygon(25% 0, 50% 0, 42% 100%, 17% 100%)',
  'polygon(50% 0, 75% 0, 67% 100%, 42% 100%)',
  'polygon(75% 0, 100% 0, 100% 100%, 67% 100%)',
];

export function HomeHero() {
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= HERO_IMAGES.length;

  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center max-md:min-h-[692px] max-md:py-24 max-md:px-6 overflow-hidden bg-surface">
      {/* Background: 4 images with diagonal clip-path seams — simultaneous fade-in */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: allLoaded ? 1 : 0 }}
      >
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{ clipPath: CLIP_PATHS[i] }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: IMAGE_POSITIONS[i] }}
              onLoad={handleImageLoad}
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/55" />
          </div>
        ))}
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Tag line */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="w-8 h-px bg-white/70" />
          <span className="text-[11px] font-semibold text-white/80 uppercase" style={{ letterSpacing: '2px' }}>
            CREATIVE DESIGNER &amp; ARCHITECT
          </span>
        </div>

        {/* Hero title */}
        <SplitText
          text="建筑 · 游戏 · AI · 艺术"
          tag="h1"
          className="text-[72px] font-bold text-white leading-none max-md:text-5xl"
          style={{ letterSpacing: '-2px' }}
          delay={60}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 60 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.2}
          rootMargin="-50px"
          textAlign="center"
        />

        {/* Subtitle */}
        <p className="mt-6 text-lg text-white/70" style={{ fontSize: '18px' }}>
          跨领域创作者 · 用设计连接现实与虚拟
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/architecture"
            className="inline-flex items-center justify-center h-12 w-40 bg-white text-ink text-[13px] font-semibold hover:bg-white/90 transition-colors"
            style={{ letterSpacing: '1px' }}
          >
            查看作品
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center h-12 w-40 border border-white/50 text-white text-[13px] font-semibold hover:bg-white/10 transition-colors"
            style={{ letterSpacing: '1px' }}
          >
            联系我
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-60 z-10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}
