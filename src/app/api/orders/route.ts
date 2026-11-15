import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createOrder, getAllOrders } from "@/services/orderService";
import { getCurrentAdmin } from "@/lib/auth";
import { notifyNewOrder } from "@/lib/email";

const orderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  businessId: z.string().min(1),
  businessName: z.string().min(1),
  image: z.string().optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  unit: z.string().optional(),
});

const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().trim().min(8, "Phone number must be at least 8 digits"),
  customerEmail: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  shippingAddress: z.object({
    street: z.string().trim().min(5, "Street address must be at least 5 characters"),
    city: z.string().trim().min(2, "City is required"),
    state: z.string().trim().min(2, "State is required"),
    pincode: z.string().trim().min(4, "Pincode is required"),
    landmark: z.string().trim().optional(),
  }),
  items: z.array(orderItemSchema).min(1, "Order must contain at least 1 item"),
  paymentMethod: z.enum(["COD", "UPI_QR", "WHATSAPP_CONFIRM"]),
  transactionRef: z.string().trim().optional(),
  customerNotes: z.string().trim().optional(),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = createOrderSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields correctly.",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      customerEmail: parsed.data.customerEmail || undefined,
      shippingAddress: parsed.data.shippingAddress,
      items: parsed.data.items.map((it) => ({
        ...it,
        total: it.price * it.quantity,
      })),
      paymentMethod: parsed.data.paymentMethod,
      transactionRef: parsed.data.transactionRef,
      customerNotes: parsed.data.customerNotes,
      utmSource: parsed.data.utmSource,
      utmCampaign: parsed.data.utmCampaign,
    });

    // Fire notifications asynchronously without delaying customer response
    notifyNewOrder(order).catch((err) => {
      console.error("Order notification dispatch error:", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process order. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const paymentStatus = searchParams.get("paymentStatus") || undefined;
    const search = searchParams.get("search") || undefined;

    const orders = await getAllOrders({ status, paymentStatus, search });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

