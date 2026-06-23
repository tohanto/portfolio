// ── Category union type ──────────────────────────
export type Category = 'architecture' | 'games' | 'ai' | 'art';

// ── Art subcategory for filter tags ──────────────
export type ArtFilter = '全部' | '绘画' | '摄影' | '海报设计';

// ── Cover media discriminator ────────────────────
export type CoverType = 'image' | 'video';

// ── Screenshot entry ────────────────────────────
export interface Screenshot {
  src: string;
  alt: string;
}

// ── Art-specific item (for masonry display) ──────
export interface ArtItem {
  id: string;
  src: string;
  alt: string;
  filter: ArtFilter;
  aspectRatio?: number;
}

// ── Detail video entry ──────────────────────────
export interface DetailVideo {
  title: string;
  src: string;
  poster?: string;
  link?: string;
  linkText?: string;
}

// ── Detail image entry ──────────────────────────
export interface DetailImage {
  src: string;
  alt: string;
  link?: string;
}

// ── AI comparison tab ──────────────────────────
export interface AIComparisonItem {
  type: 'comparison' | 'image';
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  src?: string;
  alt?: string;
}

export interface AITab {
  key: string;
  label: string;
  items: AIComparisonItem[];
}

// ── Project interface ───────────────────────────
export interface Project {
  id: string;
  category: Category;
  title: string;
  description: string;
  coverType: CoverType;
  coverSrc: string;
  coverPoster?: string;
  /** 'image' | 'video' | 'carousel' — overrides hero display based on coverType */
  heroMode?: 'image' | 'video' | 'carousel';
  heroImages?: string[];
  heroVideo?: string;
  heroVideoPoster?: string;
  /** Detail page layout mode */
  detailLayout?: 'screenshots' | 'longImage' | 'videos+longImage' | 'images' | 'aiComparison';
  longImage?: string;
  detailVideos?: DetailVideo[];
  detailImages?: DetailImage[];
  aiTabs?: AITab[];
  detail: {
    screenshots: Screenshot[];
    pdfUrl?: string;
    videoUrl?: string;
  };
  featured: boolean;
  tags?: string[];
}

// ── Navigation item ─────────────────────────────
// isScroll: true = scroll to section on homepage; false = navigate to standalone page
export interface NavItem {
  label: string;
  to: string;              // target route
  sectionId: string | null; // scroll target id, only for isScroll items
  isScroll: boolean;
}

// ── ContactModule props ─────────────────────────
export interface ContactModuleProps {
  variant: 'section' | 'fullscreen';
}

// ── Category section on homepage ────────────────
export interface CategorySectionData {
  category: Category;
  label: string;
  description: string;
}
