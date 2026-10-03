/**
 * Shared utility for building and loading Wix CDN images directly without
 * proxying through Next.js /_next/image optimizer.
 *
 * Benefits:
 * - Direct delivery from Wix CDN (Akamai/Fastly edge).
 * - Converts heavy raw PNGs (often 2-4 MB) to lightweight WebP (often 50-120 KB).
 * - Sized specifically for target usage (e.g. w_800 for cards, w_1200 for detail page).
 * - Completely prevents Next.js /_next/image timeout errors (500 TimeoutError).
 */

export interface WixImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'png' | 'jpg';
  fit?: 'fit' | 'fill';
}

/**
 * Soft ivory SVG placeholder matching the ABHI-MOH luxury brand palette (#FAF7F2 / #EADFCF).
 * Used as an inline graceful fallback when an image fails to load, preventing broken-image icons.
 */
export const SOFT_IVORY_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='750' viewBox='0 0 600 750'%3E%3Crect width='100%25' height='100%25' fill='%23FAF7F2'/%3E%3Crect x='10%25' y='10%25' width='80%25' height='80%25' fill='%23F4EFE6' rx='16'/%3E%3Ccircle cx='300' cy='375' r='36' fill='none' stroke='%23D9C7A7' stroke-width='1.5' stroke-dasharray='4 4' opacity='0.7'/%3E%3C/svg%3E";

export const FALLBACK_PRODUCT_IMAGE = '/assets/sarees/saree-maroon.png';

/**
 * Checks if a given URL originates from the Wix static media CDN.
 */
export function isWixImage(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  return (
    url.includes('static.wixstatic.com/media/') ||
    url.includes('images.wixmp.com') ||
    url.startsWith('wix:image://v1/')
  );
}

/**
 * Extracts the core Wix media key (e.g. "963eb5_5876...~mv2.png") from a Wix media URL or URI.
 */
export function extractWixMediaKey(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  if (url.includes('static.wixstatic.com/media/')) {
    const afterMedia = url.split('static.wixstatic.com/media/')[1];
    if (!afterMedia) return null;
    return afterMedia.split('/')[0];
  }

  if (url.startsWith('wix:image://v1/')) {
    const after = url.slice('wix:image://v1/'.length);
    return after.split('/')[0];
  }

  return null;
}

/**
 * Builds a transformed Wix CDN image URL with specific dimensions, quality, and WebP format.
 * If the input URL is not from Wix, it is returned unchanged.
 */
export function getWixImageUrl(
  url?: string | null,
  options: WixImageOptions = {},
): string {
  if (!url || typeof url !== 'string') {
    return FALLBACK_PRODUCT_IMAGE;
  }

  const key = extractWixMediaKey(url);
  if (!key) {
    return url;
  }

  const {
    width = 800,
    height = width,
    quality = 80,
    format = 'webp',
    fit = 'fit',
  } = options;

  return `https://static.wixstatic.com/media/${key}/v1/${fit}/w_${width},h_${height},q_${quality}/file.${format}`;
}

/**
 * Optimized image URL for product cards (e.g. Collection Grid, Exclusive Collection, Wishlist).
 * Dimensions: 800x800, Quality: 80, Format: WebP (~60-90 KB).
 */
export function wixCardImage(url?: string | null): string {
  return getWixImageUrl(url, {
    width: 800,
    height: 800,
    quality: 80,
    format: 'webp',
    fit: 'fit',
  });
}

/**
 * Optimized image URL for high-resolution product detail pages (zoom & hero inspection).
 * Dimensions: 1200x1200, Quality: 80, Format: WebP (~120-160 KB).
 */
export function wixDetailImage(url?: string | null): string {
  return getWixImageUrl(url, {
    width: 1200,
    height: 1200,
    quality: 80,
    format: 'webp',
    fit: 'fit',
  });
}

/**
 * Optimized image URL for small UI thumbnails (Cart, Checkout, Search Results, Order tracking).
 * Dimensions: 200x250, Quality: 80, Format: WebP (~5-15 KB).
 */
export function wixThumbImage(url?: string | null): string {
  return getWixImageUrl(url, {
    width: 200,
    height: 250,
    quality: 80,
    format: 'webp',
    fit: 'fit',
  });
}

/**
 * Custom Next.js Image loader that delegates image optimization directly to the Wix CDN.
 * Used with <Image loader={wixImageLoader} ... /> or unoptimized.
 */
export function wixImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!isWixImage(src)) {
    return src;
  }
  return getWixImageUrl(src, {
    width,
    height: width,
    quality: quality || 80,
    format: 'webp',
    fit: 'fit',
  });
}
