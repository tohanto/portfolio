import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigationContext } from '@/context/NavigationContext';
import { HEADER_HEIGHT } from '@/constants/navigation';
import { HomeHero } from '@/components/sections/HomeHero';
import { PersonalIntro } from '@/components/sections/PersonalIntro';
import { ContactModule } from '@/components/ui/ContactModule';
import { LazyImage } from '@/components/ui/LazyImage';
import { assetPath } from '@/utils/assetPath';

/* ───────────────────────────────────────────
 * HomePage — 1:1 Pixso 2:2 (PC首页)
 * Hero → 个人介绍 → 精选项目(3 card) → 联系区 → Footer
 * ─────────────────────────────────────────── */

const FEATURED = [
  {
    id: 'qing-song',
    category: 'architecture',
    label: '建筑设计',
    title: '地产公司轻宋产品手册制作',
    description: '宋式美学现代转译，打造适配现代人居的轻宋风格地产产品标准化手册。',
    cover: assetPath('/01建筑设计/01轻宋产品手册/封面.webp'),
  },
  {
    id: 'shining-wandering',
    category: 'games',
    label: '游戏设计',
    title: '《闪灵》场景还原与空间漫游demo',
    description: '复刻经典电影的标志性建筑空间，搭建空间漫游demo，在沉浸式探索中重构空间的叙事张力。',
    cover: assetPath('/02游戏设计/shining/封面.webp'),
  },
  {
    id: 'ai-recruitment',
    category: 'ai',
    label: 'AI辅助',
    title: 'AI人才招聘游戏方案设计demo',
    description: '利用生成式AI工具驱动的游戏化群面招聘方案设计，重构人才招聘的互动体验。',
    cover: assetPath('/03AI辅助/sunshine/01封面.webp'),
  },
];

export default function HomePage() {
  const { pendingScrollTo, setPendingScrollTo } = useNavigationContext();

  useEffect(() => {
    if (pendingScrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingScrollTo);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        setPendingScrollTo(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pendingScrollTo, setPendingScrollTo]);

  return (
    <>
      {/* 1. Hero — full screen */}
      <HomeHero />

      {/* 2. Personal Intro */}
      <PersonalIntro />

      {/* 3. 精选项目 */}
      <section className="bg-canvas" style={{ padding: '80px 60px' }}>
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-semibold text-ink-muted uppercase" style={{ letterSpacing: '2px' }}>
              SELECTED WORKS
            </span>
            <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
              精选项目
            </h2>
          </div>
          <Link
            to="/architecture"
            className="text-[13px] text-signal hover:text-signal-hover transition-colors shrink-0"
            style={{ letterSpacing: '1px' }}
          >
            查看全部
          </Link>
        </div>

        {/* 3-card row — each card navigates to project detail */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((item) => (
            <Link
              key={item.id}
              to={`/${item.category}/${item.id}`}
              className="group cursor-pointer bg-canvas-white border border-rule transition-all duration-300 hover:shadow-[5px_4px_15px_rgba(0,0,0,0.25)]"
            >
              <div className="aspect-[424/240] overflow-hidden bg-[#111111] relative">
                <LazyImage
                  src={item.cover}
                  alt={item.title}
                  containerClassName="w-full h-full"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-[13px] font-semibold text-signal" style={{ letterSpacing: '2px' }}>
                  {item.label}
                </span>
                <h3 className="mt-3 text-xl font-bold text-ink leading-[1.2]" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink-secondary leading-[1.6]">
                  {item.description}
                </p>
                <span className="inline-block mt-4 text-[10px] text-signal" style={{ letterSpacing: '1px' }}>
                  查看详情
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Contact */}
      <ContactModule variant="section" />
    </>
  );
}
