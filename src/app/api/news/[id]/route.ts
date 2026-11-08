import { NextRequest, NextResponse } from "next/server";
import { updateNews, deleteNews } from "@/services/newsService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.STRICT_AUTH === "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const updated = await updateNews(params.id, data);
  if (!updated) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath(`/news/${updated.slug}`);
  revalidatePath("/admin/news");
  revalidatePath("/admin");

  return NextResponse.json({ success: true, article: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.STRICT_AUTH === "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const success = await deleteNews(params.id);
  if (!success) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/admin/news");
  revalidatePath("/admin");

  return NextResponse.json({ success: true });
}
