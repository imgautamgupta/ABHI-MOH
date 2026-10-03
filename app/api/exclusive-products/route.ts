import { NextResponse } from 'next/server';
import { getExclusiveProducts } from '@/lib/exclusive.service';

/**
 * GET /api/exclusive-products
 *
 * Returns the products assigned to the Wix "Exclusive Collection" category,
 * in the order the admin has set via drag-and-drop in the Wix dashboard.
 *
 * - Returns { products: [], total: 0 } when the category is empty or missing.
 * - Returns { products: [], total: 0 } on Wix API errors (homepage never crashes).
 * - Cached for 60 s at the CDN/Next.js level (revalidate header).
 */
export const revalidate = 60; // ISR revalidation: 60 seconds

export async function GET() {
  try {
    const products = await getExclusiveProducts();

    return NextResponse.json(
      { success: true, total: products.length, products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    console.error('[/api/exclusive-products] Unexpected error:', error);
    return NextResponse.json(
      { success: true, total: 0, products: [] },
      { status: 200 },
    );
  }
}
