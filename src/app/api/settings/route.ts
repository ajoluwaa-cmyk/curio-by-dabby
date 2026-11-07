import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const defaults = {
    shippingFee: 2500,
    freeShippingMin: 50000,
    shippingNote: "Ships within 2–4 business days after order confirmation.",
    deliveryEstimate:
      "Lagos & major cities: typically 3–6 business days total. Other locations: 5–10 business days.",
    returnsSummary:
      "Unused items in original condition may be returned within 7 days of delivery.",
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    storeName: "Curio By Dabby",
  };

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json(defaults);

    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });

    const { data } = await supabase.from("site_settings").select("key, value");
    if (!data?.length) return NextResponse.json(defaults);

    const map = new Map(data.map((r) => [r.key, r.value]));

    return NextResponse.json({
      storeName: map.get("store_name") || defaults.storeName,
      contactEmail: map.get("contact_email") || defaults.contactEmail,
      contactPhone: map.get("contact_phone") || defaults.contactPhone,
      contactWhatsapp: map.get("contact_whatsapp") || defaults.contactWhatsapp,
      shippingFee: Number(map.get("shipping_fee") ?? defaults.shippingFee) || 0,
      freeShippingMin:
        Number(map.get("free_shipping_min") ?? defaults.freeShippingMin) || 0,
      shippingNote: map.get("shipping_note") || defaults.shippingNote,
      deliveryEstimate:
        map.get("delivery_estimate") || defaults.deliveryEstimate,
      returnsSummary: map.get("returns_summary") || defaults.returnsSummary,
    });
  } catch {
    return NextResponse.json(defaults);
  }
}
