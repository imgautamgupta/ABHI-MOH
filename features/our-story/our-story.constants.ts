// ─────────────────────────────────────────────────────────────────────────────
// ABHI-MOH — "The House of ABHI-MOH" Brand Story Scenes
// Verified language only — no invented dates, founders, or locations.
// All copy is honest and clearly marked where it is intentionally generic
// so it can be replaced with actual brand content when available.
// ─────────────────────────────────────────────────────────────────────────────

// ── Legacy interface kept so StoryChapter.tsx doesn't break ──────────────────
export interface StoryChapter {
  id: string;
  chapter: string;
  heading: string;
  subheading: string;
  body: string;
  craftNote?: string;
  imageSrc: string;
  imageAlt: string;
  imageSide: 'left' | 'right';
  bgFrom: string;
  bgTo: string;
  darkSection: boolean;
  accentHex: string;
}

// ── New Brand Scene type ─────────────────────────────────────────────────────
export interface BrandScene {
  id: string;
  /** Short nav label */
  navLabel: string;
  /** Small uppercase eyebrow above the heading */
  eyebrow?: string;
  heading: string;
  /** Italic poetic subheading */
  subheading?: string;
  /** Narrative body paragraph */
  body: string;
  /** Optional second paragraph */
  body2?: string;
  /** List items that appear staggered (for curation / belief scenes) */
  listItems?: string[];
  /** Show a CTA button at the bottom of this scene */
  hasCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  /** [0,1] progress range for this scene */
  scrollStart: number;
  scrollPeak: number;
  scrollEnd: number;
  /** Whether text should be light (dark background) or dark (light background) */
  darkSection: boolean;
  /** Accent hex for ornamental elements */
  accentHex: string;
  /** CSS gradient string for the background layer */
  bgGradient: string;
  /** Optional image that appears as a background texture/visual */
  bgImageSrc?: string;
  /** Image CSS object-position */
  bgImagePosition?: string;
  /** Background image opacity (0–1) */
  bgImageOpacity?: number;
  /** Whether to show the ornamental divider between eyebrow and heading */
  showDivider?: boolean;
}

export const BRAND_SCENES: BrandScene[] = [
  // ── SCENE 01 — WHO WE ARE ─────────────────────────────────────────────────
  {
    id: 'who-we-are',
    navLabel: 'WHO WE ARE',
    eyebrow: 'THE HOUSE OF ABHI-MOH',
    heading: 'OUR\nSTORY',
    subheading: 'Where a saree is more than a garment.',
    body: 'ABHI-MOH began with a simple idea — to make choosing a saree feel personal again. Not a transaction. Not a catalogue scroll. A discovery.',
    body2: 'We are a house that curates, not simply a store that sells. Every piece that carries the ABHI-MOH name has passed through a process of careful consideration — one that begins long before the saree reaches you.',
    scrollStart: 0.0,
    scrollPeak: 0.04,
    scrollEnd: 0.12,
    darkSection: false,
    accentHex: '#A67C52',
    bgGradient: 'linear-gradient(160deg, #FAF7F2 0%, #F2E8D9 60%, #EDE0CF 100%)',
    bgImageSrc: '/assets/sarees/saree-maroon.png',
    bgImagePosition: 'center right',
    bgImageOpacity: 0.08,
    showDivider: true,
  },

  // ── SCENE 02 — WHY WE EXIST ───────────────────────────────────────────────
  {
    id: 'why-we-exist',
    navLabel: 'WHY WE EXIST',
    eyebrow: 'THE BEGINNING',
    heading: 'WHY\nABHI-MOH',
    subheading: 'We wanted the experience to match the saree.',
    body: 'We noticed something. The finest handwoven sarees in India — pieces of genuine craft, weeks of work — were being displayed like ordinary inventory. Priced, listed, moved.',
    body2: 'We wanted to create a different kind of space. One where a saree is discovered, not just purchased. Where the story behind the cloth is as visible as the cloth itself.',
    scrollStart: 0.10,
    scrollPeak: 0.14,
    scrollEnd: 0.22,
    darkSection: false,
    accentHex: '#8B6A42',
    bgGradient: 'linear-gradient(160deg, #EDE0CF 0%, #D8C6A0 50%, #C8B49A 100%)',
    bgImageSrc: '/assets/sarees/saree-gold.png',
    bgImagePosition: 'center left',
    bgImageOpacity: 0.1,
    showDivider: true,
  },

  // ── SCENE 03 — WHAT WE DO ─────────────────────────────────────────────────
  {
    id: 'what-we-do',
    navLabel: 'WHAT WE DO',
    eyebrow: 'THE PRACTICE',
    heading: 'WE\nDISCOVER',
    subheading: 'We don\'t list sarees. We find them.',
    body: 'Every piece in the ABHI-MOH collection is sourced with intention. We look at how the fabric moves, how the zari catches light, how the pattern breathes at the border.',
    body2: 'This is not a catalogue. It is a selection. And a selection is only as meaningful as the eye behind it.',
    scrollStart: 0.20,
    scrollPeak: 0.24,
    scrollEnd: 0.32,
    darkSection: false,
    accentHex: '#7D5C3A',
    bgGradient: 'linear-gradient(160deg, #C8B49A 0%, #A89070 50%, #8C7560 100%)',
    bgImageSrc: '/assets/sarees/banarasi-detail.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.18,
    showDivider: true,
  },

  // ── SCENE 04 — CURATED BY HAND ───────────────────────────────────────────
  {
    id: 'curation',
    navLabel: 'CURATION',
    eyebrow: 'THE PHILOSOPHY',
    heading: 'CURATED\nBY HAND',
    subheading: 'We don\'t simply add sarees. We choose them.',
    body: 'Curation is not a process — it is a discipline. It requires knowing what to leave behind. For every saree that enters the ABHI-MOH collection, there are many that did not make it.',
    scrollStart: 0.30,
    scrollPeak: 0.34,
    scrollEnd: 0.42,
    darkSection: true,
    accentHex: '#C9A96E',
    bgGradient: 'linear-gradient(160deg, #3A1117 0%, #5A2028 60%, #6A2830 100%)',
    bgImageSrc: '/assets/sarees/kanjivaram-detail.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.22,
    showDivider: true,
  },

  // ── SCENE 05 — THE SELECTION CRITERIA ────────────────────────────────────
  {
    id: 'selection',
    navLabel: 'SELECTION',
    eyebrow: 'THE EYE',
    heading: 'WHAT WE\nLOOK FOR',
    subheading: 'Nothing is ordinary here.',
    body: 'When a saree is considered for ABHI-MOH, it is evaluated across every dimension that makes Indian textiles extraordinary.',
    listItems: ['FABRIC', 'WEAVE', 'ZARI', 'COLOUR', 'DRAPE', 'FINISH'],
    scrollStart: 0.40,
    scrollPeak: 0.44,
    scrollEnd: 0.52,
    darkSection: true,
    accentHex: '#B59A62',
    bgGradient: 'linear-gradient(160deg, #241B1C 0%, #3A2820 50%, #4A3028 100%)',
    bgImageSrc: '/assets/sarees/chanderi-detail.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.2,
    showDivider: false,
  },

  // ── SCENE 06 — THE JOURNEY ────────────────────────────────────────────────
  {
    id: 'journey',
    navLabel: 'THE JOURNEY',
    eyebrow: 'THE CRAFT',
    heading: 'FROM\nTHREAD\nTO SAREE',
    subheading: 'The distance between a thread and a saree is measured in weeks.',
    body: 'A handwoven saree is not made quickly. It begins with the selection of raw silk, moves to the dyeing of thread, through the preparation of the loom, and then — one careful row at a time — becomes something extraordinary.',
    listItems: ['THREAD', 'WEAVE', 'CRAFT', 'FINISH', 'SAREE'],
    scrollStart: 0.50,
    scrollPeak: 0.54,
    scrollEnd: 0.62,
    darkSection: true,
    accentHex: '#C9A96E',
    bgGradient: 'linear-gradient(160deg, #2B1510 0%, #5A2028 40%, #C8B49A 100%)',
    bgImageSrc: '/assets/sarees/tussar-detail.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.25,
    showDivider: true,
  },

  // ── SCENE 07 — THE PEOPLE ─────────────────────────────────────────────────
  {
    id: 'people',
    navLabel: 'THE PEOPLE',
    eyebrow: 'THE HUMAN BEHIND THE CLOTH',
    heading: 'BEHIND\nEVERY\nSAREE',
    subheading: 'Knowledge that lives in the hands.',
    body: 'Every ABHI-MOH saree is the result of skilled hands that understand their craft completely — not from books or instructions, but from years of practice and inherited technique.',
    body2: 'The weaver, the zari artisan, the dyer, the finisher. Each brings a form of knowledge that cannot be replicated by machinery. We believe in the people behind the cloth.',
    scrollStart: 0.60,
    scrollPeak: 0.64,
    scrollEnd: 0.72,
    darkSection: false,
    accentHex: '#8B6A42',
    bgGradient: 'linear-gradient(160deg, #F4EFE7 0%, #EDE0CF 50%, #DFD0B8 100%)',
    bgImageSrc: '/assets/sarees/saree-paithani.png',
    bgImagePosition: 'center right',
    bgImageOpacity: 0.1,
    showDivider: true,
  },

  // ── SCENE 08 — NOT EVERYTHING MAKES THE CUT ─────────────────────────────
  {
    id: 'not-everything',
    navLabel: 'THE EDIT',
    eyebrow: 'THE EDIT',
    heading: 'NOT\nEVERYTHING\nMAKES THE CUT.',
    subheading: 'A collection is defined by what it leaves out.',
    body: 'We see many pieces. We choose the ones that feel right for ABHI-MOH — not by formula, but by feel. By whether a saree has the quality of presence that the occasion deserves.',
    body2: 'The ones we do not choose are not flawed. They simply are not ABHI-MOH. That distinction matters.',
    scrollStart: 0.70,
    scrollPeak: 0.74,
    scrollEnd: 0.82,
    darkSection: true,
    accentHex: '#C9A96E',
    bgGradient: 'linear-gradient(160deg, #4A1C24 0%, #6A2830 50%, #7D3038 100%)',
    bgImageSrc: '/assets/sarees/organza-detail.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.18,
    showDivider: true,
  },

  // ── SCENE 09 — WHAT WE BELIEVE ────────────────────────────────────────────
  {
    id: 'belief',
    navLabel: 'OUR BELIEF',
    eyebrow: 'OUR BELIEF',
    heading: 'WHAT\nWE\nBELIEVE',
    subheading: 'Quietly, but with complete conviction.',
    body: 'ABHI-MOH is built on a set of values that have never needed to be announced — only demonstrated in every piece we choose.',
    listItems: [
      'CRAFT OVER NOISE',
      'DETAIL OVER EXCESS',
      'QUALITY OVER QUANTITY',
      'TIMELESS OVER TREND',
    ],
    scrollStart: 0.80,
    scrollPeak: 0.84,
    scrollEnd: 0.92,
    darkSection: false,
    accentHex: '#A67C52',
    bgGradient: 'linear-gradient(160deg, #FAF7F2 0%, #F8F4ED 50%, #F2E8D9 100%)',
    showDivider: true,
  },

  // ── SCENE 10 — A NOTE FROM ABHI-MOH ──────────────────────────────────────
  {
    id: 'closing',
    navLabel: 'A NOTE',
    eyebrow: 'A NOTE FROM THE HOUSE',
    heading: 'EVERY\nSAREE\nCARRIES A\nSTORY.',
    subheading: 'Yours is about to begin.',
    body: 'We are grateful that you are here. That you took the time to understand what ABHI-MOH is before you looked at what ABHI-MOH has.',
    body2: 'The collection is waiting. And everything in it was chosen with you in mind — even before we knew it was for you.',
    hasCta: true,
    ctaLabel: 'EXPLORE THE COLLECTION',
    ctaHref: '/collections',
    scrollStart: 0.90,
    scrollPeak: 0.94,
    scrollEnd: 1.0,
    darkSection: false,
    accentHex: '#A67C52',
    bgGradient: 'linear-gradient(160deg, #EDE0CF 0%, #F4EFE7 50%, #FAF7F2 100%)',
    bgImageSrc: '/assets/sarees/saree-gold.png',
    bgImagePosition: 'center',
    bgImageOpacity: 0.07,
    showDivider: true,
  },
];
