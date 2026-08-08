import type { Metadata } from 'next';
import { CollectionsPage } from '@/features/collections/CollectionsPage';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Collections | ${SITE_METADATA.name}`,
  description: 'Explore the curated luxury saree collections by ABHI-MOH.',
};

export default function Page() {
  return <CollectionsPage />;
}
