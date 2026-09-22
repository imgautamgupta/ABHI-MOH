import { NextResponse } from "next/server";
import { getProducts } from "@/lib/product.service";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getProducts();

    const headers = {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    };

    if (products.length === 0) {
      return NextResponse.json({ success: true, total: 0, products: [] }, { headers });
    }

    return NextResponse.json(
      {
        success: true,
        total: products.length,
        products,
      },
      { headers }
    );
  } catch (error) {
    console.error("[/api/products] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products. Please try again later.",
      },
      { status: 500 }
    );
  }
}