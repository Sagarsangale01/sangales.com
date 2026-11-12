import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import {
  getAllProductsAcrossBusinesses,
  addProductToBusiness,
} from "@/services/businessService";

export async function GET() {
  try {
    const products = await getAllProductsAcrossBusinesses();
    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { businessId, name, description, image, category, price, directBuyUrl } = body;

    if (!businessId || !name || !description) {
      return NextResponse.json(
        { success: false, error: "businessId, name, and description are required" },
        { status: 400 }
      );
    }

    const created = await addProductToBusiness(businessId, {
      name,
      description,
      image,
      category,
      price,
      directBuyUrl,
    });

    if (!created) {
      return NextResponse.json(
        { success: false, error: "Business entity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

