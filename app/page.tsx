import { Hero } from '@/features/hero/Hero';
import { AppleStyleScrollSection } from '@/features/showcase/AppleStyleScrollSection';
import { ExclusiveCollectionWrapper } from '@/features/collections/ExclusiveCollectionWrapper';
import { BrandStatement } from '@/features/brand/BrandStatement';
import { EditorialCardsSection } from '@/features/editorial/EditorialCardsSection';
import { FaqAndReturnSection } from '@/features/faq/FaqAndReturnSection';

// ISR: revalidate the homepage (and thus the Exclusive Collection section)
// every 60 seconds so admin changes in Wix appear within ~1 minute.
export const revalidate = 60;

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] text-[#2A221E]">
      <Hero />
      <AppleStyleScrollSection />
      <ExclusiveCollectionWrapper />
      <BrandStatement />
      <EditorialCardsSection />
      <FaqAndReturnSection />
    </main>
  );
}
