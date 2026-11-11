import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createEnquiry, getAllEnquiries } from "@/services/enquiryService";
import { getCurrentAdmin } from "@/lib/auth";
import { notifyNewEnquiry } from "@/lib/email";

const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required (minimum 2 characters)"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address (e.g. contact@company.com)"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits"),
  companyName: z.string().trim().optional(),
  enquiryType: z
    .string()
    .trim()
    .min(2, "Please select an enquiry classification"),
  businessId: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(5, "Message must contain at least 5 characters describing your enquiry"),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, "Please accept the privacy consent to submit"),
  // Invisible Honeypot Anti-Spam Field
  botTrap: z.string().optional(),
});

// Simple in-memory sliding window rate limiter: max 6 requests per 10 minutes per IP
const ipRateMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRateMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRateMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRateMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many enquiries received from this connection. Please wait a few minutes before retrying.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Silent honeypot drop: if botTrap is populated, simulate success without saving or notifying
    if (body.botTrap && String(body.botTrap).trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully." },
        { status: 201 }
      );
    }

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

    // Asynchronously dispatch transactional notifications (email + mobile alert)
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
      const fieldErrors = error.flatten().fieldErrors;
      const errorList = Object.entries(fieldErrors)
        .map(([field, msgs]) => `${field}: ${(msgs || []).join(", ")}`)
        .join("; ");

      return NextResponse.json(
        {
          success: false,
          message: errorList || "Please verify your input fields and retry.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("Enquiry submission unexpected error:", error);
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

  const enquiries = await getAllEnquiries({ status, businessId, search });
  return NextResponse.json({ success: true, enquiries });
}
