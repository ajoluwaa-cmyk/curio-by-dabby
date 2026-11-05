"use client";

import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { mapRowToProduct } from "@/lib/map-product";

export async function fetchProductsClient(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(error);
    return [];
  }
  return data.map((row) => mapRowToProduct(row as Record<string, unknown>));
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function filterProductsForGift(params: {
  products: Product[];
  budgetMax?: number;
}): Product[] {
  let result = params.products.filter((p) => p.inStock);
  if (params.budgetMax) {
    result = result.filter((p) => p.price <= params.budgetMax!);
  }
  return [...result].sort((a, b) => {
    if (a.isOriginal && !b.isOriginal) return -1;
    if (!a.isOriginal && b.isOriginal) return 1;
    return 0;
  });
}
