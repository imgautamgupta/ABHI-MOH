import type { Metadata } from 'next';
import { Lookbook } from '@/features/lookbook/Lookbook';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Haute Couture Lookbook & Editorial Campaign | ${SITE_METADATA.name}`,
  description:
    'Experience the ABHI-MOH interactive haute-couture fashion magazine lookbook. Curated drape editorials, bridal heritage weaves, and pure silk essays.',
  alternates: {
    canonical: `${SITE_METADATA.url}/lookbook`,
  },
  openGraph: {
    title: `Haute Couture Lookbook | ${SITE_METADATA.name}`,
    description:
      'Experience the ABHI-MOH interactive haute-couture fashion magazine lookbook. Curated drape editorials, bridal heritage weaves, and pure silk essays.',
    url: `${SITE_METADATA.url}/lookbook`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: '/assets/sarees/saree-maroon.png',
        width: 1200,
        height: 630,
        alt: 'ABHI-MOH Lookbook Editorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Haute Couture Lookbook | ${SITE_METADATA.name}`,
    description:
      'Experience the ABHI-MOH interactive haute-couture fashion magazine lookbook.',
    images: ['/assets/sarees/saree-maroon.png'],
  },
};

export default function Page() {
  return <Lookbook />;
}
