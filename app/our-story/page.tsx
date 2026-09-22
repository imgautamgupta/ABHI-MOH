import type { Metadata } from 'next';
import { OurStory } from '@/features/our-story/OurStory';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Our Heritage Story & Loom Artisans | ${SITE_METADATA.name}`,
  description:
    'Discover the legacy, artisanal master weavers, and centuries-old handloom craftsmanship behind ABHI-MOH haute couture sarees.',
  alternates: {
    canonical: `${SITE_METADATA.url}/our-story`,
  },
  openGraph: {
    title: `Our Heritage Story | ${SITE_METADATA.name}`,
    description:
      'Discover the legacy, artisanal master weavers, and centuries-old handloom craftsmanship behind ABHI-MOH haute couture sarees.',
    url: `${SITE_METADATA.url}/our-story`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: '/assets/sarees/saree-maroon.png',
        width: 1200,
        height: 630,
        alt: 'ABHI-MOH Heritage Loom Atelier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Our Heritage Story | ${SITE_METADATA.name}`,
    description:
      'Discover the legacy, artisanal master weavers, and centuries-old handloom craftsmanship behind ABHI-MOH.',
    images: ['/assets/sarees/saree-maroon.png'],
  },
};

export default function Page() {
  return <OurStory />;
}
