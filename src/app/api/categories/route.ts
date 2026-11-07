import { NextRequest, NextResponse } from "next/server";
import { getCategories, createCategory, deleteCategory } from "@/services/businessService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ success: true, categories });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }

  const newCat = await createCategory(name, description);

  revalidatePath("/", "layout");
  revalidatePath("/businesses");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/businesses");

  return NextResponse.json({ success: true, category: newCat }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await deleteCategory(id);

  revalidatePath("/", "layout");
  revalidatePath("/businesses");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/businesses");

  return NextResponse.json({ success: true });
}
