import { NextRequest, NextResponse } from "next/server";
import { getAllCareers, createCareer } from "@/services/careerService";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const careers = await getAllCareers();
  return NextResponse.json({ success: true, careers });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const created = await createCareer(data);
    return NextResponse.json({ success: true, career: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
