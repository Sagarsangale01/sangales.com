import { NextRequest, NextResponse } from "next/server";
import { getAllBusinesses, createBusiness } from "@/services/businessService";
import { getCurrentAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const businesses = await getAllBusinesses();
  return NextResponse.json({ success: true, businesses });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const created = await createBusiness(data);

    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/businesses");
    revalidatePath(`/businesses/${created.slug}`);
    revalidatePath("/admin/businesses");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, business: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
