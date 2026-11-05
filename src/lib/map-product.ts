import { Product } from "@/types/product";

/** Shared mapper — safe for server and client */
export function mapRowToProduct(row: Record<string, unknown>): Product {
  const imageUrls = (row.image_urls as string[] | null) || [];
  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    category: row.category as Product["category"],
    subcategory: (row.subcategory as string) || undefined,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price
      ? Number(row.compare_at_price)
      : undefined,
    description: String(row.description || ""),
    shortDescription: String(row.short_description || ""),
    tag: (row.tag as Product["tag"]) || null,
    colors: (row.colors as string[]) || undefined,
    sizes: (row.sizes as string[]) || undefined,
    inStock: Boolean(row.in_stock),
    isOriginal: Boolean(row.is_original),
    isLimited: Boolean(row.is_limited),
    collection: (row.collection as Product["collection"]) || undefined,
    occasionTags: (row.occasion_tags as string[]) || undefined,
    styleTags: (row.style_tags as string[]) || undefined,
    imageGradient: (row.image_gradient as string) || undefined,
    imageUrls,
  };
}
