export type SpreadTheme = 'LIGHT' | 'DARK';

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


