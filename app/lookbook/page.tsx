import type { Metadata } from 'next';
import { Lookbook } from '@/features/lookbook/Lookbook';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Lookbook | ${SITE_METADATA.name}`,
  description: 'Experience the ABHI-MOH interactive haute-couture hardcover fashion magazine lookbook.',
};

export default function Page() {
  return <Lookbook />;
}
