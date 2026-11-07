import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitApplication, getAllApplications } from "@/services/careerService";
import { getCurrentAdmin } from "@/lib/auth";

const appSchema = z.object({
  careerId: z.string().min(1),
  jobTitle: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  resumeUrl: z.string().min(3),
  coverLetter: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = appSchema.parse(body);

    const app = await submitApplication(validated);
    return NextResponse.json({ success: true, application: app }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apps = await getAllApplications();
  return NextResponse.json({ success: true, applications: apps });
}

