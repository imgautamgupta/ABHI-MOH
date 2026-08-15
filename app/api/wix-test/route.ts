import { NextResponse } from "next/server";
import { getProducts } from "@/lib/product.service";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.error("Products API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}