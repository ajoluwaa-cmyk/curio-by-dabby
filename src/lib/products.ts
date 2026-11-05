import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";
import { mapRowToProduct } from "@/lib/map-product";

export { mapRowToProduct };

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("[getAllProducts]", error);
    return [];
  }
  return data.map(mapRowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_visible", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapRowToProduct(data);
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function filterProductsForGift(params: {
  products: Product[];
  budgetMax?: number;
  occasion?: string;
}): Product[] {
  let result = params.products.filter((p) => p.inStock);

  if (params.budgetMax) {
    result = result.filter((p) => p.price <= params.budgetMax!);
  }

  result = [...result].sort((a, b) => {
    if (a.isOriginal && !b.isOriginal) return -1;
    if (!a.isOriginal && b.isOriginal) return 1;
    return 0;
  });

  return result;
}
