import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import {
  getAllProductsAcrossBusinesses,
  getInventorySummary,
  updateProductInventory,
} from "@/services/businessService";

export async function GET() {
  try {
    const [products, summary] = await Promise.all([
      getAllProductsAcrossBusinesses(),
      getInventorySummary(),
    ]);

    return NextResponse.json({
      success: true,
      summary,
      products,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, stockStatus, stockQuantity, price, mrp, unit, sku } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Product id is required" }, { status: 400 });
    }

    const updated = await updateProductInventory(id, {
      stockStatus,
      stockQuantity: stockQuantity !== undefined ? Number(stockQuantity) : undefined,
      price,
      mrp,
      unit,
      sku,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const summary = await getInventorySummary();

    return NextResponse.json({
      success: true,
      product: updated,
      summary,
      message: `Inventory updated for ${updated.name}`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

