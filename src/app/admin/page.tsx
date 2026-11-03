import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/types/database";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: orderCount },
    { data: recentOrders },
    { data: pendingOrders },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("id, customer_full_name, subtotal, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, href: "/admin/products" },
    { label: "Orders", value: orderCount ?? 0, href: "/admin/orders" },
    {
      label: "Pending orders",
      value: pendingOrders ?? 0,
      href: "/admin/orders",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-light text-charcoal">Dashboard</h1>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-taupe/15 bg-white p-5 transition hover:border-plum/25 hover:shadow-soft"
          >
            <p className="text-xs text-taupe">{s.label}</p>
            <p className="mt-1 text-2xl font-light text-charcoal">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-taupe/15 bg-white">
        <div className="flex items-center justify-between border-b border-taupe/10 px-5 py-4">
          <h2 className="text-sm font-medium text-charcoal">Recent orders</h2>
          <Link href="/admin/orders" className="text-xs text-plum hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-taupe/10 text-xs text-taupe">
              <tr>
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {(recentOrders || []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-taupe">
                    No orders yet
                  </td>
                </tr>
              )}
              {(recentOrders || []).map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-taupe/5 hover:bg-ivory/50"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="font-medium text-plum hover:underline"
                    >
                      {o.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-charcoal">
                    {o.customer_full_name}
                  </td>
                  <td className="px-5 py-3">{formatNaira(o.subtotal)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3 text-taupe">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-champagne/40 text-charcoal",
    processing: "bg-plum/10 text-plum",
    shipped: "bg-blue-50 text-blue-800",
    delivered: "bg-green-50 text-green-800",
    cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${
        colors[status] || "bg-taupe/10 text-taupe"
      }`}
    >
      {status}
    </span>
  );
}
