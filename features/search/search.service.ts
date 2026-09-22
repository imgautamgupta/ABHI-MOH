import { SareeProduct } from '@/features/collections/components/hanging-card.types';

// In-memory cache for fast instant searching
let cachedProducts: SareeProduct[] | null = null;

/**
 * Fetches all available products from Wix / API for live search indexing.
 */
export async function fetchSearchIndex(): Promise<SareeProduct[]> {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts;
  }

  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products for search');
    const data = await res.json();
    if (data.success && Array.isArray(data.products)) {
      cachedProducts = data.products;
      return cachedProducts!;
    }
  } catch (err) {
    console.warn('[search.service] Error fetching live products index:', err);
  }

  return cachedProducts || [];
}

/**
 * Searches and ranks products based on multi-field query matching.
 */
export function filterProductsByQuery(
  products: SareeProduct[],
  rawQuery: string
): SareeProduct[] {
  const q = rawQuery.toLowerCase().trim();
  if (!q) return [];

  const searchTerms = q.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    // Build comprehensive search corpus from all product attributes
    const searchableCorpus = [
      product.name,
      product.material,
      product.origin,
      product.weave,
      product.category,
      product.plainDescription,
      product.description,
      product.badges?.join(' '),
      product.slug,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // Every word typed in the query must match something in the corpus
    return searchTerms.every((term) => searchableCorpus.includes(term));
  });
}
