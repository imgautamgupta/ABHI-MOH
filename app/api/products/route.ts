import { NextResponse } from "next/server";
import { getProducts } from "@/lib/product.service";

export async function GET() {
  try {
    const products = await getProducts();

    if (products.length === 0) {
      return NextResponse.json({ success: true, total: 0, products: [] });
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      products,
    });
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