import { LazyImage } from '@/components/ui/LazyImage';
import { assetPath } from '@/utils/assetPath';

export function PersonalIntro() {
  return (
    <section id="about" className="scroll-mt-header bg-canvas-white">
      <div className="flex max-md:flex-col h-[692px] max-md:h-auto">
        {/* Left: Text column — 720px wide, matching Pixso 2:25 */}
        <div className="w-1/2 max-md:w-full flex items-center">
          <div className="py-[60px] pl-[60px] pr-[60px] max-md:p-8">
            {/* " ABOUT" label — 10px Semi Bold, #999, letter-spacing 2px */}
            <span className="text-[10px] font-semibold text-ink-muted uppercase" style={{ letterSpacing: '2px' }}>
               ABOUT
            </span>

            {/* Title — 36px Bold, #111, letter-spacing -1px */}
            <h2 className="mt-2 text-[36px] font-bold text-ink leading-[1.1]" style={{ letterSpacing: '-1px' }}>
              我是杨涵，跨领域探索者
            </h2>

            {/* Bio — 16px Regular, #555, line-height 170%, max-width 520px */}
            <p className="mt-6 text-base text-ink-secondary leading-[1.7] max-w-[520px]" style={{ fontSize: '16px' }}>
              擅长建筑设计、游戏设计、AI辅助创作与，爱好视觉艺术创作。我相信跨界思维能够激发更具突破性的创作，将理性结构与感性表达融为一体。
            </p>
          </div>
        </div>

        {/* Right: Photo column — 720px wide, matching Pixso 2:29 */}
        <div className="w-1/2 max-md:w-full h-[692px] max-md:h-80 relative overflow-hidden bg-surface">
          <LazyImage
            src={assetPath("/00个人简介/01基本信息/生活照.jpg")}
            alt="杨涵"
            containerClassName="w-full h-full"
            className="object-cover"
          />
          {/* Gradient overlay matching Pixso */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
