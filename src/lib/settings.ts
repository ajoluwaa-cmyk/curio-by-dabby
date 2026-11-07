import { createClient } from "@/lib/supabase/server";

export type StoreSettings = {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  shippingFee: number;
  freeShippingMin: number;
  shippingNote: string;
  deliveryEstimate: string;
  returnsSummary: string;
};

const defaults: StoreSettings = {
  storeName: "Curio By Dabby",
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  shippingFee: 2500,
  freeShippingMin: 50000,
  shippingNote: "Ships within 2–4 business days after order confirmation.",
  deliveryEstimate:
    "Lagos & major cities: typically 3–6 business days total. Other locations: 5–10 business days.",
  returnsSummary:
    "Unused items in original condition may be returned within 7 days of delivery.",
};

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("key, value");
    if (!data?.length) return defaults;

    const map = new Map(data.map((r) => [r.key, r.value]));

    return {
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
    };
  } catch {
    return defaults;
  }
}

export function calcShipping(
  subtotal: number,
  fee: number,
  freeMin: number
): number {
  if (freeMin > 0 && subtotal >= freeMin) return 0;
  return fee;
}
