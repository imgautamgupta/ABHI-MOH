import { wixClient } from './wix';
import { getWixImageUrl } from './wixImage';
import type { SareeProduct, BadgeType, AdditionalInfoSection } from '@/features/collections/components/hanging-card.types';

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
  'new': 'New Arrival',
  'limited edition': 'Limited Edition',
  'limited': 'Limited Edition',
  'handwoven': 'Handwoven',
  'royal heritage': 'Royal Heritage',
  'masterpiece': 'Masterpiece',
  'sale': 'Sale',
  'special offer': 'Sale',
  'discount': 'Sale',
  'special edition': 'Special Edition',
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
  const rawMainUrl: string | undefined = product.media?.mainMedia?.image?.url;
  if (rawMainUrl) {
    images.push(getWixImageUrl(rawMainUrl, { width: 1200, height: 1200, quality: 80, format: 'webp' }));
  }
  const items: { image?: { url?: string }; mediaType?: string }[] =
    product.media?.items ?? [];
  for (const item of items) {
    const rawUrl = item.image?.url;
    if (rawUrl) {
      const optimizedUrl = getWixImageUrl(rawUrl, { width: 1200, height: 1200, quality: 80, format: 'webp' });
      if (!images.includes(optimizedUrl)) images.push(optimizedUrl);
    }
  }
  if (images.length === 0) {
    images.push('/assets/sarees/saree-maroon.png'); // design fallback
  }

  // ── Description & Material ────────────────────────────────────────────────
  // Wix product description can be rich HTML markup or formatted plain text.
  // We preserve the full untruncated content for detail pages, while providing a clean
  // excerpt for compact collection cards.
  const rawDescription: string = product.description ?? '';
  const plainDescription = stripHtml(rawDescription);

  let materialExcerpt = 'Luxury Saree';
  if (plainDescription) {
    const firstSentence = plainDescription.split(/[.!?]\s/)[0];
    materialExcerpt =
      firstSentence && firstSentence.length <= 80
        ? firstSentence
        : plainDescription.length > 75
        ? `${plainDescription.slice(0, 75).trim()}…`
        : plainDescription;
  }

  // ── Additional Info Sections from Wix ────────────────────────────────────
  const additionalInfo: AdditionalInfoSection[] = [];
  if (Array.isArray(product.additionalInfoSections)) {
    for (const sec of product.additionalInfoSections) {
      if (sec && (sec.title || sec.description)) {
        additionalInfo.push({
          title: sec.title || 'Product Information',
          description: sec.description || '',
        });
      }
    }
  }

  // ── Badges from ribbons & active discount ───────────────────────────────
  const badges = mapRibbons(product.ribbons);
  if (isDiscounted && !badges.includes('Sale')) {
    badges.unshift('Sale');
  }

  // ── Category from Wix product groups (V3) / collections (V1) ────────────
  let category: CategoryFilter = undefined;
  // V3 catalog stores group membership under categoryIds or productGroupIds;
  // V1 used collectionIds — check all to stay backward-compatible.
  const collectionIds: string[] = [
    ...(product.collectionIds ?? []),
    ...(product.categoryIds ?? []),
    ...(product.productGroupIds ?? []),
  ];
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

  // ── Saree Craft Specifications ──────────────────────────────────────────
  const fullText = `${product.name ?? ''} ${rawDescription}`.toLowerCase();
  let origin = 'Varanasi, India';
  if (fullText.includes('chanderi')) origin = 'Chanderi, Madhya Pradesh';
  else if (fullText.includes('kanchipuram') || fullText.includes('kanjivaram')) origin = 'Kanchipuram, Tamil Nadu';
  else if (fullText.includes('paithani') || fullText.includes('pathai')) origin = 'Paithan, Maharashtra';
  else if (fullText.includes('tussar')) origin = 'Bhagalpur, Bihar';
  else if (fullText.includes('banarasi') || fullText.includes('banaras')) origin = 'Varanasi, Uttar Pradesh';

  let weave = 'Handloom Artisan Brocade';
  if (fullText.includes('kadhwa')) weave = 'Authentic Kadhwa Handloom Weave';
  else if (fullText.includes('tanchoi')) weave = 'Tanchoi Silk Brocade';
  else if (fullText.includes('zari') || fullText.includes('gold')) weave = 'Gold Zari Floral Jaal Weave';
  else if (fullText.includes('tussar')) weave = 'Tussar Handwoven Texture';
  else if (fullText.includes('organza')) weave = 'Pure Organza Sheer Weave';
  else if (fullText.includes('paithani') || fullText.includes('pathai')) weave = 'Paithani Silk with Muniya Border';

  return {
    id: product._id ?? '',
    name: product.name ?? 'Unnamed Saree',
    slug: product.slug ?? product._id ?? '',
    description: rawDescription || materialExcerpt,
    descriptionHtml: rawDescription || undefined,
    plainDescription: plainDescription || materialExcerpt,
    material: materialExcerpt,
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
    origin,
    weave,
    sareeLength: '5.5 Meters',
    blousePiece: 'Included (0.8m Unstitched)',
    care: 'Dry Clean Only',
    additionalInfo: additionalInfo.length > 0 ? additionalInfo : undefined,
    createdAt,
  };
}

// ---------------------------------------------------------------------------
// In-Memory Cache with TTL to minimize redundant Wix API roundtrips
// ---------------------------------------------------------------------------
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let productsCache: CacheEntry<SareeProduct[]> | null = null;
let collectionMapCache: CacheEntry<Map<string, CategoryFilter>> | null = null;
const singleProductCache = new Map<string, CacheEntry<SareeProduct | null>>();

// Flag to avoid repeated console warnings if Wix group API is uninstalled
let hasLoggedCollectionWarning = false;

// ---------------------------------------------------------------------------
// Fetch Wix collections → build collectionId → CategoryFilter map (Cached)
// ---------------------------------------------------------------------------
async function buildCollectionMap(): Promise<Map<string, CategoryFilter>> {
  const now = Date.now();
  if (collectionMapCache && now - collectionMapCache.timestamp < CACHE_TTL_MS) {
    return collectionMapCache.data;
  }

  const map = new Map<string, CategoryFilter>();
  try {
    const result = await wixClient.productGroupsV3.queryProductGroups().find();
    for (const col of result.items) {
      if (col._id && col.name) {
        const cat = normalizeCollectionName(col.name);
        if (cat) map.set(col._id, cat);
      }
    }
    collectionMapCache = { data: map, timestamp: now };
    return map;
  } catch {
    // V3 product groups unavailable, try V1 collections query
    try {
      const v1Result = await wixClient.collections.queryCollections().find();
      for (const col of v1Result.items) {
        if (col._id && col.name) {
          const cat = normalizeCollectionName(col.name);
          if (cat) map.set(col._id, cat);
        }
      }
      collectionMapCache = { data: map, timestamp: now };
      return map;
    } catch {
      if (!hasLoggedCollectionWarning && process.env.NODE_ENV === 'development') {
        console.warn('[product.service] Wix collections/groups unavailable; categories inferred from product metadata.');
        hasLoggedCollectionWarning = true;
      }
      if (collectionMapCache) return collectionMapCache.data;
    }
  }
  return map;
}

// ---------------------------------------------------------------------------
// Public API with Intelligent Caching
// ---------------------------------------------------------------------------

/** Returns all visible Wix products mapped to SareeProduct[]. */
export async function getProducts(limit = 100): Promise<SareeProduct[]> {
  const now = Date.now();
  if (productsCache && now - productsCache.timestamp < CACHE_TTL_MS) {
    return productsCache.data;
  }

  const [productsResult, collectionMap] = await Promise.all([
    wixClient.products.queryProducts().limit(limit).find(),
    buildCollectionMap(),
  ]);

  const mapped = productsResult.items
    .filter((p) => p.visible !== false)
    .map((p) => mapWixProduct(p, collectionMap));

  productsCache = { data: mapped, timestamp: now };

  // Prime single-product cache for each loaded item to make detail navigations instant
  for (const item of mapped) {
    if (item.slug) {
      singleProductCache.set(item.slug, { data: item, timestamp: now });
    }
  }

  return mapped;
}

/** Returns a single product by slug, or null if not found. */
export async function getProductBySlug(slug: string): Promise<SareeProduct | null> {
  const now = Date.now();
  const cached = singleProductCache.get(slug);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const [productsResult, collectionMap] = await Promise.all([
    wixClient.products.queryProducts().eq('slug', slug).limit(1).find(),
    buildCollectionMap(),
  ]);

  if (productsResult.items.length === 0) {
    singleProductCache.set(slug, { data: null, timestamp: now });
    return null;
  }

  const mapped = mapWixProduct(productsResult.items[0], collectionMap);
  singleProductCache.set(slug, { data: mapped, timestamp: now });
  return mapped;
}