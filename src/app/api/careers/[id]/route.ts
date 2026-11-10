import { NextRequest, NextResponse } from "next/server";
import { updateCareer, deleteCareer } from "@/services/careerService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const updated = await updateCareer(params.id, data);
  if (!updated) {
    return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  revalidatePath("/admin");

  return NextResponse.json({ success: true, career: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const success = await deleteCareer(params.id);
  if (!success) {
    return NextResponse.json({ error: "Job opening not found" }, { status: 404 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  revalidatePath("/admin");

  return NextResponse.json({ success: true });
}
