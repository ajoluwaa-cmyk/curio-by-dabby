import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/types/database";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-light text-charcoal">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-plum px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-plum/90"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-taupe/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-taupe/10 text-xs text-taupe">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Visible</th>
              <th className="px-5 py-3 font-medium">Flags</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {(products || []).length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-taupe">
                  No products.{" "}
                  <Link href="/admin/products/new" className="text-plum underline">
                    Add one
                  </Link>{" "}
                  or run seed SQL.
                </td>
              </tr>
            )}
            {(products || []).map((p) => (
              <tr key={p.id} className="border-b border-taupe/5 hover:bg-ivory/40">
                <td className="px-5 py-3 font-medium text-charcoal">{p.name}</td>
                <td className="px-5 py-3 text-taupe">{p.category}</td>
                <td className="px-5 py-3">{formatNaira(p.price)}</td>
                <td className="px-5 py-3">
                  {p.in_stock ? (
                    <span className="text-green-700">In stock</span>
                  ) : (
                    <span className="text-red-600">Out</span>
                  )}
                  {p.stock_quantity != null && (
                    <span className="ml-1 text-taupe">({p.stock_quantity})</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {p.is_visible ? "Yes" : "No"}
                </td>
                <td className="px-5 py-3 text-xs text-taupe">
                  {[p.is_original && "Original", p.is_limited && "Limited", p.tag]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-plum hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
