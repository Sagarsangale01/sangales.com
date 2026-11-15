import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOrderById, updateOrderStatus } from "@/services/orderService";
import { getCurrentAdmin } from "@/lib/auth";

const updateSchema = z.object({
  orderStatus: z.enum(["PLACED", "CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "VERIFIED", "FAILED"]).optional(),
  trackingNumber: z.string().trim().optional(),
  courierPartner: z.string().trim().optional(),
  adminNotes: z.string().trim().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const json = await req.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update fields", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(params.id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      order: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}

