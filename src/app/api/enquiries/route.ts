import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createEnquiry, getAllEnquiries } from "@/services/enquiryService";
import { getCurrentAdmin } from "@/lib/auth";
import { notifyNewEnquiry } from "@/lib/email";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  companyName: z.string().optional(),
  enquiryType: z.string().min(2, "Enquiry type is required"),
  businessId: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  privacyConsent: z.boolean().refine((val) => val === true, "Privacy consent required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = enquirySchema.parse(body);

    const enquiry = await createEnquiry({
      businessId: validated.businessId,
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      companyName: validated.companyName,
      enquiryType: validated.enquiryType,
      subject: validated.subject,
      message: validated.message,
    });

    // Asynchronously dispatch transactional notifications
    notifyNewEnquiry({
      id: enquiry.id,
      fullName: enquiry.fullName,
      email: enquiry.email,
      phone: enquiry.phone,
      companyName: enquiry.companyName,
      enquiryType: enquiry.enquiryType,
      businessName: enquiry.businessName,
      message: enquiry.message,
    }).catch((err) => console.error("Notification dispatch error:", err));

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const businessId = searchParams.get("businessId") || undefined;
  const search = searchParams.get("search") || undefined;

  const list = await getAllEnquiries({ status, businessId, search });
  return NextResponse.json({ success: true, enquiries: list });
}

