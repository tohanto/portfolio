import type { NavItem, CategorySectionData } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: '首页', to: '/', sectionId: null, isScroll: false },
  { label: '关于我', to: '/about', sectionId: null, isScroll: false },
  { label: '建筑设计', to: '/architecture', sectionId: null, isScroll: false },
  { label: '游戏设计', to: '/games', sectionId: null, isScroll: false },
  { label: 'AI辅助', to: '/ai', sectionId: null, isScroll: false },
  { label: '视觉艺术', to: '/art', sectionId: null, isScroll: false },
  { label: '联系我', to: '/contact', sectionId: null, isScroll: false },
];

export const HEADER_HEIGHT = 64;

export const CATEGORY_SECTIONS: CategorySectionData[] = [
  {
    category: 'architecture',
    label: '建筑设计',
    description: '探索空间与形态的无限可能——从宋代美学到现代绿色建筑',
  },
  {
    category: 'games',
    label: '游戏设计',
    description: 'UE5 引擎制作的虚拟世界——场景构建、关卡设计与交互体验',
  },
  {
    category: 'ai',
    label: 'AI 辅助',
    description: '将人工智能融入创意工作流——从图像生成到交互设计',
  },
  {
    category: 'art',
    label: '视觉艺术',
    description: '绘画、摄影与海报设计——用多元视觉语言表达创意',
  },
];
