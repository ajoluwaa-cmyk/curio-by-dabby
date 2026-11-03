import { NextRequest, NextResponse } from "next/server";
import { CreateOrderPayload, Order } from "@/types/order";

function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `CURIO-${num}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderPayload;

    if (
      !body?.customer?.fullName ||
      !body?.customer?.email ||
      !body?.customer?.phone
    ) {
      return NextResponse.json(
        { error: "Missing customer details" },
        { status: 400 }
      );
    }

    if (!body?.shipping?.address || !body?.shipping?.city || !body?.shipping?.state) {
      return NextResponse.json(
        { error: "Missing shipping details" },
        { status: 400 }
      );
    }

    if (!body?.items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "pending",
      customer: body.customer,
      shipping: {
        ...body.shipping,
        country: body.shipping.country || "Nigeria",
      },
      items: body.items,
      subtotal: body.subtotal,
      giftNote: body.giftNote || undefined,
      paymentStatus: "unpaid",
    };

    // Phase 1: order is accepted and returned.
    // When Admin + database are ready, persist `order` here (e.g. Supabase/Postgres).
    // For now the client also keeps a copy on the success page via query/session.

    console.log("[Curio Order]", JSON.stringify(order, null, 2));

    return NextResponse.json({
      success: true,
      orderId: order.id,
      order,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 }
    );
  }
}
