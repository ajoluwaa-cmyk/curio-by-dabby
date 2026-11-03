import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `CURIO-${num}`;
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env missing");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const orderId = generateOrderId();
    const supabase = getServiceClient();

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      status: "pending",
      payment_status: "unpaid",
      customer_full_name: body.customer.fullName,
      customer_email: body.customer.email,
      customer_phone: body.customer.phone,
      shipping_address: body.shipping.address,
      shipping_city: body.shipping.city,
      shipping_state: body.shipping.state,
      shipping_country: body.shipping.country || "Nigeria",
      shipping_note: body.shipping.note || null,
      gift_note: body.giftNote || null,
      subtotal: body.subtotal || 0,
    });

    if (orderError) {
      console.error(orderError);
      return NextResponse.json(
        { error: orderError.message || "Could not create order" },
        { status: 500 }
      );
    }

    const items = body.items.map(
      (i: {
        productId?: string;
        name: string;
        price: number;
        quantity: number;
        selectedColor?: string;
        selectedSize?: string;
      }) => ({
        order_id: orderId,
        product_id: i.productId || null,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        selected_color: i.selectedColor || null,
        selected_size: i.selectedSize || null,
      })
    );

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) {
      console.error(itemsError);
    }

    // Upsert customer
    await supabase.from("customers").upsert(
      {
        email: body.customer.email,
        full_name: body.customer.fullName,
        phone: body.customer.phone,
      },
      { onConflict: "email" }
    );

    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "pending",
      customer: body.customer,
      shipping: body.shipping,
      items: body.items,
      subtotal: body.subtotal,
      giftNote: body.giftNote,
      paymentStatus: "unpaid",
    };

    return NextResponse.json({ success: true, orderId, order });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 }
    );
  }
}
