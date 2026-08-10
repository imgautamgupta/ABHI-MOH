import { Hero } from '@/features/hero/Hero';
import { AppleStyleScrollSection } from '@/features/showcase/AppleStyleScrollSection';
import { ExclusiveCollectionSection } from '@/features/collections/ExclusiveCollectionSection';
import { BrandStatement } from '@/features/brand/BrandStatement';
import { EditorialCardsSection } from '@/features/editorial/EditorialCardsSection';
import { FaqAndReturnSection } from '@/features/faq/FaqAndReturnSection';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] text-[#2A221E]">
      <Hero />
      <AppleStyleScrollSection />
      <ExclusiveCollectionSection />
      <BrandStatement />
      <EditorialCardsSection />
      <FaqAndReturnSection />
    </main>
  );
}
