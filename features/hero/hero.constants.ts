import { SareeSlide, HeroContentData } from './hero.types';

export const HERO_CONTENT: HeroContentData = {
  brandName: 'ABHI-MOH',
  tagline: 'The Essence of Elegance',
  paragraph: 'Luxury sarees crafted with timeless artistry, celebrating every occasion with elegance.',
  buttonText: 'Explore Collection',
};

export const SAREE_SLIDES: SareeSlide[] = [
  {
    id: 'hero-mannequin-maroon',
    title: 'Haute Couture Royal Maroon Silk Saree',
    colorName: 'Royal Velvet & 24K Zari',
    imageSrc: '/assets/sarees/hero-mannequin.png',
    alt: 'ABHI-MOH Haute Couture Saree on Mannequin in Vintage Luxury Studio',
  },
  {
    id: 'kanjivaram-crimson',
    title: 'Heritage Kanjivaram Pure Silk Saree',
    colorName: 'Crimson Ruby & Antique Gold',
    imageSrc: '/assets/sarees/saree-kanjivaram.png',
    alt: 'ABHI-MOH Kanjivaram Pure Silk Saree',
  },
  {
    id: 'chanderi-champagne',
    title: 'Chanderi Fine Tissue Silk Saree',
    colorName: 'Champagne Gold',
    imageSrc: '/assets/sarees/saree-chanderi.png',
    alt: 'ABHI-MOH Chanderi Tissue Silk Saree',
  },
];

export const HERO_VIDEO_PATHS = {
  mp4: '/videos/hero/hero-saree.mp4',
  webm: '/videos/hero/hero-saree.webm',
};

export const SAREE_TRANSITION_INTERVAL = 7000; // 7 Seconds
