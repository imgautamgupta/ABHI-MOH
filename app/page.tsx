import { Hero } from '@/features/hero/Hero';
import { ExclusiveCollectionSection } from '@/features/collections/ExclusiveCollectionSection';
import { EditorialCardsSection } from '@/features/editorial/EditorialCardsSection';
import { FaqAndReturnSection } from '@/features/faq/FaqAndReturnSection';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] text-[#2A221E]">
      <Hero />
      <ExclusiveCollectionSection />
      <EditorialCardsSection />
      <FaqAndReturnSection />
    </main>
  );
}
