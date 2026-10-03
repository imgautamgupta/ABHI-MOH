/**
 * ExclusiveCollectionWrapper.tsx (Server Component)
 *
 * Fetches "Exclusive Collection" products from Wix server-side and passes
 * them to the <ExclusiveCollectionSection> client component.
 *
 * - No output is rendered when the category is empty or missing.
 * - Next.js ISR revalidation (60 s) propagates automatically from the
 *   in-memory cache in exclusive.service.ts.
 */

import { getExclusiveProducts } from '@/lib/exclusive.service';
import { ExclusiveCollectionSection } from './ExclusiveCollectionSection';

export async function ExclusiveCollectionWrapper() {
  let products: Awaited<ReturnType<typeof getExclusiveProducts>> = [];

  try {
    products = await getExclusiveProducts();
  } catch {
    // Service already logs; keep products = [] to hide the section gracefully.
  }

  // Delegate rendering (and the empty-array guard) to the client component.
  return <ExclusiveCollectionSection products={products} />;
}

ExclusiveCollectionWrapper.displayName = 'ExclusiveCollectionWrapper';
