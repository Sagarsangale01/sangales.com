import { getStore, saveStore, OrderRecord, OrderItem } from "@/lib/store";

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  items: OrderItem[];
  paymentMethod: "COD" | "UPI_QR" | "WHATSAPP_CONFIRM";
  transactionRef?: string;
  customerNotes?: string;
  utmSource?: string;
  utmCampaign?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRecord> {
  const store = getStore();
  store.orders = store.orders || [];

  const now = new Date();
  const year = now.getFullYear();
  const count = store.orders.length + 1;
  const orderNumber = `SNG-${year}-${String(1000 + count)}`;

  // Calculate pricing
  const subtotal = input.items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
  const taxAmount = 0; // Inclusive of GST
  const shippingFee = subtotal >= 999 ? 0 : subtotal > 0 ? 80 : 0; // Free delivery above ₹999
  const totalAmount = subtotal + taxAmount + shippingFee;

  const order: OrderRecord = {
    id: `ord-${Date.now()}`,
    orderNumber,
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone.trim(),
    customerEmail: input.customerEmail?.trim() || "",
    shippingAddress: input.shippingAddress,
    items: input.items,
    subtotal,
    taxAmount,
    shippingFee,
    totalAmount,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentMethod === "UPI_QR" && input.transactionRef ? "PAID" : "PENDING",
    orderStatus: "PLACED",
    transactionRef: input.transactionRef?.trim() || "",
    customerNotes: input.customerNotes?.trim() || "",
    utmSource: input.utmSource,
    utmCampaign: input.utmCampaign,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  store.orders.unshift(order);
  saveStore(store);

  return order;
}

export async function getAllOrders(filter?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
}): Promise<OrderRecord[]> {
  const store = getStore();
  let list = [...(store.orders || [])];

  if (filter?.status && filter.status !== "ALL") {
    list = list.filter((o) => o.orderStatus === filter.status);
  }

  if (filter?.paymentStatus && filter.paymentStatus !== "ALL") {
    list = list.filter((o) => o.paymentStatus === filter.paymentStatus);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
        o.shippingAddress.city.toLowerCase().includes(q) ||
        o.shippingAddress.pincode.includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<OrderRecord | null> {
  const store = getStore();
  const order = (store.orders || []).find((o) => o.id === id || o.orderNumber === id);
  return order || null;
}

export async function updateOrderStatus(
  id: string,
  updates: {
    orderStatus?: OrderRecord["orderStatus"];
    paymentStatus?: OrderRecord["paymentStatus"];
    trackingNumber?: string;
    courierPartner?: string;
    adminNotes?: string;
  }
): Promise<OrderRecord | null> {
  const store = getStore();
  store.orders = store.orders || [];
  const idx = store.orders.findIndex((o) => o.id === id || o.orderNumber === id);
  if (idx === -1) return null;

  store.orders[idx] = {
    ...store.orders[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStore(store);
  return store.orders[idx];
}

