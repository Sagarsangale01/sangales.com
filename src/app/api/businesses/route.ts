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
  if (!admin && process.env.STRICT_AUTH === "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const created = await createBusiness(data);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/businesses");
      revalidatePath(`/businesses/${created.slug}`);
      revalidatePath("/contact");
      revalidatePath("/admin/businesses");
      revalidatePath("/admin");
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ success: true, business: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
