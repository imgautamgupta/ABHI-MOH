// ─────────────────────────────────────────────────────────────────────────────
// ABHI-MOH — Our Story: Footsteps Journey Map Data
//
// Editorial milestones traced across India's master weaving corridors.
// [bracketed] items are visible TODO placeholders for brand curators only.
// ─────────────────────────────────────────────────────────────────────────────

export interface StoryMilestone {
  year: string;
  chapter: string;
  title: string;
  subtitle?: string;
  location: string;
  craftHeritage: string;
  body: string;
  side: 'left' | 'right' | 'center';
  pathProgress: number; // 0 to 1 position along the footsteps path
  todoNote?: string;    // [TODO] internal curator note — not rendered on the live page
}

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '2020',
    chapter: 'CHAPTER I',
    title: 'FROM A THREAD',
    subtitle: 'The Inception',
    location: 'Varanasi, Uttar Pradesh',
    craftHeritage: 'Kadhwa Brocade & Mulberry Silk',
    body: 'What began in 2020 as a quiet reverence for Indian handloom traditions sparked an enduring obsession. A single pure silk thread, spun with intention, laid the foundation for what ABHI-MOH would become.',
    side: 'right',
    pathProgress: 0.08,
    todoNote: '[TODO: Insert archival founding atelier photograph when digitised]',
  },
  {
    year: '2021',
    chapter: 'CHAPTER II',
    title: 'THE SEARCH',
    subtitle: 'Into the Loom Corridors',
    location: 'Chanderi & Maheshwar, Madhya Pradesh',
    craftHeritage: 'Gossamer Zari Weaves & Tissue Silk',
    body: 'We journeyed into the heart of historic weaving regions—seeking the master artisans whose generational looms breathe life into antique gold zari. Beyond ephemeral trends, we sought timeless integrity.',
    side: 'left',
    pathProgress: 0.26,
    todoNote: '[TODO: Verify names of generational master weaver clusters]',
  },
  {
    year: '2022',
    chapter: 'CHAPTER III',
    title: 'THE CRAFT',
    subtitle: 'Sacred Loom Partnerships',
    location: 'Kanchipuram, Tamil Nadu',
    craftHeritage: 'Korvai Borders & Heavy Temple Silks',
    body: 'We forged direct alliances with generational weaver families. Honoring sacred traditions where every pallu is interlocked by hand, celebrating the patient hands that keep heritage alive.',
    side: 'right',
    pathProgress: 0.46,
    todoNote: '[TODO: Add audio interview snippet with Kanchipuram master artisan]',
  },
  {
    year: '2023',
    chapter: 'CHAPTER IV',
    title: 'THE CURATION',
    subtitle: 'Aesthetic Discernment',
    location: 'Paithan & Yeola, Maharashtra',
    craftHeritage: 'Muniya Borders & Asawali Weaves',
    body: 'Every drape evaluated with uncompromising standards. Only pieces that embody museum-grade silk purity, electroplated gold threads, and flawless drape are chosen to enter the collection.',
    side: 'left',
    pathProgress: 0.66,
    todoNote: '[TODO: Confirm thread count metrics for signature silk quality badge]',
  },
  {
    year: '2024',
    chapter: 'CHAPTER V',
    title: 'THE ARRIVAL',
    subtitle: 'Haute Couture Legacy',
    location: 'Bengal & Assam Looms',
    craftHeritage: 'Jamdani Motifs & Muga Wild Silk',
    body: 'ABHI-MOH emerges as a sanctuary for collectors and connoisseurs. Bridging regal archives with modern editorial grace, crafting sarees meant to be passed down through generations.',
    side: 'right',
    pathProgress: 0.84,
    todoNote: '[TODO: Add exhibition dates for 2024 retrospective]',
  },
  {
    year: 'Today',
    chapter: 'CHAPTER VI',
    title: 'ABHI-MOH',
    subtitle: 'The Essence of Elegance',
    location: 'Flagship Atelier',
    craftHeritage: 'Royal Indian Handlooms',
    body: 'A luxury saree house dedicated to timeless Indian craftsmanship. Every handloom creation carries centuries of soul—and the journey continues with the one you choose to make your own.',
    side: 'center',
    pathProgress: 1.0,
    todoNote: '[TODO: Connect seasonal couture lookbook link when published]',
  },
];
