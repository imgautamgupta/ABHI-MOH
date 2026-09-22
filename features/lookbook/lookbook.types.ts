export type SpreadTheme = 'LIGHT' | 'DARK' | 'WARM_IVORY' | 'DEEP_MAROON' | 'WARM_SAND' | 'ANTIQUE_OLIVE';

export type LayoutVariant =
  | 'asymmetric-split'
  | 'cinematic-wide'
  | 'magazine-triptych'
  | 'editorial-dialogue';

export interface EditorialImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
}

export interface LookBreakdown {
  lookNumber: string;
  lookName: string;
  drapeStyle: string;
  description: string;
  image: string;
}

export interface EditorialStory {
  id: string;
  editionNumber: string; // e.g. '01', '02', '03'
  category: string; // e.g. 'THE HERITAGE EDIT', 'THE WEDDING EDIT', 'THE SILK EDIT', etc.
  tagline: string; // e.g. 'Threads that remember generations.'
  headline: string;
  quote?: string;
  storyBody: string[];
  mainImage: EditorialImage;
  secondaryImage?: EditorialImage;
  detailImage?: EditorialImage;
  layoutVariant: LayoutVariant;
  theme: SpreadTheme;
  metadata: {
    craft: string;
    origin: string;
    technique: string;
    palette: string;
    artisanGuild?: string;
  };
  looks?: LookBreakdown[];
}

export interface ChapterSpread {
  id: string;
  chapterNumber: string;
  chapterTag: string;
  title: string;
  subtitle?: string;
  storyText: string;
  image: string;
  imageAlt: string;
  theme: SpreadTheme;
  metadata: {
    craft: string;
    location: string;
    artisan?: string;
    material?: string;
  };
  productUrl?: string;
  imagePosition?: 'LEFT' | 'RIGHT';
}

export interface FullBleedMomentData {
  id: string;
  image: string;
  imageAlt: string;
  captionTitle: string;
  captionSub: string;
}

export interface SareeMetadata {
  title: string;
  image: string;
  material: string;
  craft: string;
  color: string;
  collection: string;
  shortDescription: string;
}

export interface LookbookSpread {
  id: string;
  spreadNumber: number;
  title: string;
  leftItem: SareeMetadata;
  rightItem: SareeMetadata;
}
