import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/types/database";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-light text-charcoal">Orders</h1>
      <div className="overflow-x-auto rounded-2xl border border-taupe/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-taupe/10 text-xs text-taupe">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Payment</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-taupe">
                  No orders yet
                </td>
              </tr>
            )}
            {(orders || []).map((o) => (
              <tr key={o.id} className="border-b border-taupe/5 hover:bg-ivory/40">
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="font-medium text-plum hover:underline"
                  >
                    {o.id}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <div>{o.customer_full_name}</div>
                  <div className="text-xs text-taupe">{o.customer_email}</div>
                </td>
                <td className="px-5 py-3">{formatNaira(o.subtotal)}</td>
                <td className="px-5 py-3 capitalize">{o.status}</td>
                <td className="px-5 py-3 capitalize">{o.payment_status}</td>
                <td className="px-5 py-3 text-taupe">
                  {new Date(o.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
