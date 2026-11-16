import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { trackOrderByNumberAndPhone } from "@/services/orderService";

const trackSchema = z.object({
  orderNumber: z.string().trim().min(3, "Please enter a valid order number (e.g. SNG-2026-1002)"),
  phone: z.string().trim().min(6, "Please enter your registered phone number"),
});

// Simple sliding window rate limiter: 15 track requests per 5 minutes per IP
const ipRateMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

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
          message: "Too many tracking lookups attempted. Please wait 5 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const json = await req.json();
    const parsed = trackSchema.safeParse(json);

    if (!parsed.success) {
      const firstError = Object.values(parsed.error.format())
        .find((v: any) => v?._errors?.length)?._errors?.[0];
      return NextResponse.json(
        { success: false, message: firstError || "Please enter valid tracking details" },
        { status: 400 }
      );
    }

    const order = await trackOrderByNumberAndPhone(
      parsed.data.orderNumber,
      parsed.data.phone
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No order found matching this Order Number and Phone Number. Please check your confirmation SMS / Email or contact our dispatch desk.",
        },
        { status: 404 }
      );
    }

    // Mask sensitive details slightly if needed, or return the full fulfillment info
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Order tracking API error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while tracking your order." },
      { status: 500 }
    );
  }
}

