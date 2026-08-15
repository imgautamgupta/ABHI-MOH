import { wixClient } from './wix';
import type { SareeProduct, BadgeType } from '@/features/collections/components/hanging-card.types';

// ---------------------------------------------------------------------------
// Category mapping — Wix collection names → existing CategoryFilter values
// ---------------------------------------------------------------------------
type CategoryFilter = SareeProduct['category'];

const COLLECTION_NAME_MAP: Record<string, CategoryFilter> = {
  'new arrivals': 'NEW ARRIVALS',
  'new arrival': 'NEW ARRIVALS',
  'handwoven': 'HANDWOVEN',
  'hand woven': 'HANDWOVEN',
  'silk': 'SILK',
  'zari': 'ZARI',
  'festive': 'FESTIVE',
  'limited edition': 'LIMITED EDITION',
  'limited': 'LIMITED EDITION',
};

function normalizeCollectionName(name: string): CategoryFilter | null {
  const key = name.toLowerCase().trim();
  // Exact match first
  if (COLLECTION_NAME_MAP[key]) return COLLECTION_NAME_MAP[key]!;
  // Partial match
  for (const [pattern, category] of Object.entries(COLLECTION_NAME_MAP)) {
    if (key.includes(pattern)) return category;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Ribbon → Badge mapping
// ---------------------------------------------------------------------------
const RIBBON_TO_BADGE: Record<string, BadgeType> = {
  'new arrival': 'New Arrival',
  'new arrivals': 'New Arrival',
  'limited edition': 'Limited Edition',
  'handwoven': 'Handwoven',
  'royal heritage': 'Royal Heritage',
  'masterpiece': 'Masterpiece',
};

function mapRibbons(ribbons?: { text?: string }[]): BadgeType[] {
  if (!ribbons || ribbons.length === 0) return [];
  const badges: BadgeType[] = [];
  for (const r of ribbons) {
    const key = (r.text ?? '').toLowerCase().trim();
    const badge = RIBBON_TO_BADGE[key];
    if (badge && !badges.includes(badge)) badges.push(badge);
  }
  return badges;
}

// ---------------------------------------------------------------------------
// Strip HTML tags from Wix description (description is returned as HTML)
// ---------------------------------------------------------------------------
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Core mapper: Wix Product → SareeProduct
// ---------------------------------------------------------------------------
export function mapWixProduct(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any,
  collectionMap: Map<string, CategoryFilter> = new Map()
): SareeProduct {
  // ── Price ────────────────────────────────────────────────────────────────
  const priceData = product.price ?? product.priceData;
  const rawPrice: number = priceData?.price ?? 0;
  const rawDiscounted: number | undefined = priceData?.discountedPrice;
  const isDiscounted = rawDiscounted !== undefined && rawDiscounted < rawPrice;

  const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  const priceFormatted = priceData?.formatted?.price ?? formatINR(rawPrice);
  const discountedFormatted = isDiscounted
    ? (priceData?.formatted?.discountedPrice ?? formatINR(rawDiscounted!))
    : undefined;

  // Final displayed price is the effective (possibly discounted) price
  const effectivePriceNum = isDiscounted ? rawDiscounted! : rawPrice;
  const effectivePriceFormatted = isDiscounted ? discountedFormatted! : priceFormatted;

  // ── Images ───────────────────────────────────────────────────────────────
  const images: string[] = [];
  const mainUrl: string | undefined = product.media?.mainMedia?.image?.url;
  if (mainUrl) images.push(mainUrl);
  const items: { image?: { url?: string }; mediaType?: string }[] =
    product.media?.items ?? [];
  for (const item of items) {
    const url = item.image?.url;
    if (url && !images.includes(url)) images.push(url);
  }
  if (images.length === 0) {
    images.push('/assets/sarees/saree-maroon.png'); // design fallback
  }

  // ── Material / craft description ─────────────────────────────────────────
  const rawDescription: string = product.description ?? '';
  const material = rawDescription
    ? stripHtml(rawDescription).slice(0, 100)
    : 'Luxury Saree';

  // ── Badges from ribbons ──────────────────────────────────────────────────
  const badges = mapRibbons(product.ribbons);

  // ── Category from Wix collections ───────────────────────────────────────
  let category: CategoryFilter = undefined;
  const collectionIds: string[] = product.collectionIds ?? [];
  for (const cid of collectionIds) {
    const cat = collectionMap.get(cid);
    if (cat) {
      category = cat;
      break;
    }
  }

  // ── Stock ────────────────────────────────────────────────────────────────
  const inStock: boolean = product.stock?.inStock ?? true;

  // ── Created date ─────────────────────────────────────────────────────────
  let createdAt: string | undefined;
  if (product._createdDate) {
    try {
      createdAt = new Date(product._createdDate).toISOString().split('T')[0];
    } catch {
      createdAt = undefined;
    }
  }

  return {
    id: product._id ?? '',
    name: product.name ?? 'Unnamed Saree',
    slug: product.slug ?? product._id ?? '',
    material,
    price: effectivePriceFormatted,
    priceNumber: effectivePriceNum,
    ...(isDiscounted && {
      discountedPrice: discountedFormatted,
      originalPrice: priceFormatted,
    }),
    images,
    badges: badges.length > 0 ? badges : undefined,
    isFavorite: false,
    inStock,
    category,
    createdAt,
  };
}

// ---------------------------------------------------------------------------
// Fetch Wix collections → build collectionId → CategoryFilter map
// ---------------------------------------------------------------------------
async function buildCollectionMap(): Promise<Map<string, CategoryFilter>> {
  const map = new Map<string, CategoryFilter>();
  try {
    const result = await wixClient.collections.queryCollections().find();
    for (const col of result.items) {
      if (col._id && col.name) {
        const cat = normalizeCollectionName(col.name);
        if (cat) map.set(col._id, cat);
      }
    }
  } catch (err) {
    // Collections query may fail if the OAuth scope is not granted yet.
    // Products will still load; they just won't have category assigned.
    console.warn('[product.service] Could not fetch Wix collections:', err);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns all visible Wix products mapped to SareeProduct[]. */
export async function getProducts(limit = 100): Promise<SareeProduct[]> {
  const [productsResult, collectionMap] = await Promise.all([
    wixClient.products.queryProducts().limit(limit).find(),
    buildCollectionMap(),
  ]);

  return productsResult.items
    .filter((p) => p.visible !== false)
    .map((p) => mapWixProduct(p, collectionMap));
}

/** Returns a single product by slug, or null if not found. */
export async function getProductBySlug(slug: string): Promise<SareeProduct | null> {
  const [productsResult, collectionMap] = await Promise.all([
    wixClient.products.queryProducts().eq('slug', slug).limit(1).find(),
    buildCollectionMap(),
  ]);

  if (productsResult.items.length === 0) return null;
  return mapWixProduct(productsResult.items[0], collectionMap);
}