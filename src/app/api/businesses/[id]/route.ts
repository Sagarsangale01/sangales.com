import { NextRequest, NextResponse } from "next/server";
import { updateBusiness, deleteBusiness, getBusinessBySlug, getAllBusinesses } from "@/services/businessService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const businesses = await getAllBusinesses();
  const business = businesses.find((b) => b.id === params.id || b.slug === params.id);
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, business });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateBusiness(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Force revalidation of all public and admin pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/businesses");
      revalidatePath(`/businesses/${updated.slug}`);
      revalidatePath("/contact");
      revalidatePath("/admin/businesses");
      revalidatePath("/admin");
    } catch (e) {
      // ignore in environments where revalidation is mocked
    }

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
  if (!admin) {
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
