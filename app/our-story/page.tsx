import type { Metadata } from 'next';
import { OurStory } from '@/features/our-story/OurStory';
import { SITE_METADATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Our Story | ${SITE_METADATA.name}`,
  description: 'Explore the legacy, master craft traditions, and royal heritage of ABHI-MOH sarees.',
};

export default function Page() {
  return <OurStory />;
}
