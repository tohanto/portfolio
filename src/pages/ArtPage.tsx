import { useState, useMemo } from 'react';
import type { ArtFilter } from '@/types';
import { useProjectData } from '@/hooks/useProjectData';
import { FilterTags } from '@/components/ui/FilterTags';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { assetPath } from '@/utils/assetPath';

const FILTER_OPTIONS: ArtFilter[] = ['全部', '绘画', '摄影', '海报设计'];

const HERO_IMAGES = [
  assetPath('/04视觉艺术/海报设计/文创海报.webp'),
  assetPath('/04视觉艺术/绘画/1.webp'),
  assetPath('/04视觉艺术/绘画/9.webp'),
  assetPath('/04视觉艺术/摄影/sy2.webp'),
];

export default function ArtPage() {
  const [activeFilter, setActiveFilter] = useState<ArtFilter>('全部');
  const { getArtItems } = useProjectData();
  const allItems = getArtItems();
  const filtered = useMemo(() => {
    if (activeFilter === '全部') return allItems;
    return allItems.filter((i) => i.filter === activeFilter);
  }, [activeFilter, allItems]);

  return (
    <div>
      {/* Hero carousel */}
      <div className="relative w-full h-[600px]">
        <ImageCarousel images={HERO_IMAGES} alt="视觉艺术" height="600px" />
        <div className="absolute bottom-0 left-0 right-0 p-[60px] z-10 pointer-events-none">
          <div className="container-page">
            <h1 className="text-[72px] font-bold text-white leading-none" style={{ letterSpacing: '-2px' }}>
              视觉艺术
            </h1>
            <p className="mt-2 text-lg text-[#CCCCCC]">
              海报设计 &middot; 手绘画作 &middot; 摄影作品
            </p>
          </div>
        </div>
      </div>

      {/* Content with filter */}
      <div className="container-page" style={{ padding: '80px 0' }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-[32px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
              图片展示
            </h2>
          </div>
          <FilterTags options={FILTER_OPTIONS} active={activeFilter} onChange={setActiveFilter} />
        </div>
        <MasonryGrid items={filtered} />
      </div>
    </div>
  );
}
