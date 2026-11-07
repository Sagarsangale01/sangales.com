import { NextRequest, NextResponse } from "next/server";
import { updateBusiness, deleteBusiness, getBusinessBySlug } from "@/services/businessService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateBusiness(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Force revalidation of all public and admin pages
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/businesses");
    revalidatePath(`/businesses/${updated.slug}`);
    revalidatePath("/admin/businesses");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, business: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const success = await deleteBusiness(params.id);
  if (!success) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/businesses");
  revalidatePath("/admin/businesses");
  revalidatePath("/admin");

  return NextResponse.json({ success: true });
}
