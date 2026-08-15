import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/product.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { success: false, error: "Product slug is required." },
      { status: 400 }
    );
  }

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error(`[/api/products/${slug}] Error:`, error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch product." },
      { status: 500 }
    );
  }
}
