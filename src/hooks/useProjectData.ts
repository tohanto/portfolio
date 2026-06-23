import { useMemo } from 'react';
import type { Category, Project, ArtItem } from '@/types';
import projectsData from '@/data/projects.json';

const projects = projectsData as Project[];

// Art items — real images from public/04视觉艺术/
const artItems: ArtItem[] = [
  // 绘画 (14 items)
  { id: 'painting-1', src: '/04视觉艺术/绘画/1.jpg', alt: '绘画作品1', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-2', src: '/04视觉艺术/绘画/2.jpg', alt: '绘画作品2', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-3', src: '/04视觉艺术/绘画/3.jpg', alt: '绘画作品3', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-4', src: '/04视觉艺术/绘画/4.jpg', alt: '绘画作品4', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-5', src: '/04视觉艺术/绘画/5.jpg', alt: '绘画作品5', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-6', src: '/04视觉艺术/绘画/6.jpg', alt: '绘画作品6', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-7', src: '/04视觉艺术/绘画/7.jpg', alt: '绘画作品7', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-8', src: '/04视觉艺术/绘画/8.jpg', alt: '绘画作品8', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-9', src: '/04视觉艺术/绘画/9.jpg', alt: '绘画作品9', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-10', src: '/04视觉艺术/绘画/10.jpg', alt: '绘画作品10', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-11', src: '/04视觉艺术/绘画/11.jpg', alt: '绘画作品11', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-12', src: '/04视觉艺术/绘画/12.jpg', alt: '绘画作品12', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-13', src: '/04视觉艺术/绘画/13.jpg', alt: '绘画作品13', filter: '绘画', aspectRatio: 3/4 },
  { id: 'painting-14', src: '/04视觉艺术/绘画/14.jpg', alt: '绘画作品14', filter: '绘画', aspectRatio: 3/4 },
  // 摄影 (3 items)
  { id: 'photo-1', src: '/04视觉艺术/摄影/sy1.png', alt: '摄影作品1', filter: '摄影', aspectRatio: 4/3 },
  { id: 'photo-2', src: '/04视觉艺术/摄影/sy2.png', alt: '摄影作品2', filter: '摄影', aspectRatio: 4/3 },
  { id: 'photo-3', src: '/04视觉艺术/摄影/sy3.png', alt: '摄影作品3', filter: '摄影', aspectRatio: 4/3 },
  // 海报设计 (1 item)
  { id: 'poster-1', src: '/04视觉艺术/海报设计/文创海报.png', alt: '文创海报设计', filter: '海报设计', aspectRatio: 2/3 },
];

export function useProjectData() {
  const getAllProjects = useMemo(() => () => projects, []);

  const getProjectsByCategory = useMemo(
    () => (category: Category) => projects.filter((p) => p.category === category),
    []
  );

  const getProjectById = useMemo(
    () => (category: Category, id: string) =>
      projects.find((p) => p.category === category && p.id === id),
    []
  );

  const getFeaturedProjects = useMemo(
    () => () => projects.filter((p) => p.featured),
    []
  );

  const getArtItems = useMemo(
    () => (filter?: string) => {
      if (!filter || filter === '全部') return artItems;
      return artItems.filter((item) => item.filter === filter);
    },
    []
  );

  return {
    getAllProjects,
    getProjectsByCategory,
    getProjectById,
    getFeaturedProjects,
    getArtItems,
  };
}

export { projects, artItems };
