import type { Metadata } from 'next';
import { CollectionsPage } from '@/features/collections/CollectionsPage';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Haute Couture Saree Collections | ${SITE_METADATA.name}`,
  description:
    'Discover handcrafted Banarasi silks, Kanjivaram heirlooms, Chanderi drapes, and royal artisanal sarees curated by ABHI-MOH.',
  alternates: {
    canonical: `${SITE_METADATA.url}/collections`,
  },
  openGraph: {
    title: `Haute Couture Saree Collections | ${SITE_METADATA.name}`,
    description:
      'Discover handcrafted Banarasi silks, Kanjivaram heirlooms, Chanderi drapes, and royal artisanal sarees curated by ABHI-MOH.',
    url: `${SITE_METADATA.url}/collections`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: '/assets/sarees/saree-maroon.png',
        width: 1200,
        height: 630,
        alt: 'ABHI-MOH Saree Collections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Haute Couture Saree Collections | ${SITE_METADATA.name}`,
    description:
      'Discover handcrafted Banarasi silks, Kanjivaram heirlooms, Chanderi drapes, and royal artisanal sarees curated by ABHI-MOH.',
    images: ['/assets/sarees/saree-maroon.png'],
  },
};

export default function Page() {
  return <CollectionsPage />;
}
