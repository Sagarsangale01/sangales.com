import { NextRequest, NextResponse } from "next/server";
import { getAllNews, createNews } from "@/services/newsService";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const news = await getAllNews();
  return NextResponse.json({ success: true, news });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const created = await createNews(data);
    return NextResponse.json({ success: true, article: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
