import { createClient } from "@/lib/supabase/server";

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  // Also surface unique emails from orders if customers table empty
  const { data: orderEmails } = await supabase
    .from("orders")
    .select("customer_email, customer_full_name, customer_phone, created_at")
    .order("created_at", { ascending: false });

  const fromOrders = new Map<
    string,
    { email: string; full_name: string; phone: string; created_at: string }
  >();
  (orderEmails || []).forEach((o) => {
    if (!fromOrders.has(o.customer_email)) {
      fromOrders.set(o.customer_email, {
        email: o.customer_email,
        full_name: o.customer_full_name,
        phone: o.customer_phone,
        created_at: o.created_at,
      });
    }
  });

  const list =
    (customers || []).length > 0
      ? customers!
      : Array.from(fromOrders.values());

  return (
    <div>
      <h1 className="mb-6 text-2xl font-light text-charcoal">Customers</h1>
      <div className="overflow-x-auto rounded-2xl border border-taupe/15 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-taupe/10 text-xs text-taupe">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Since</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-taupe">
                  No customers yet
                </td>
              </tr>
            )}
            {list.map((c) => (
              <tr
                key={c.email}
                className="border-b border-taupe/5 hover:bg-ivory/40"
              >
                <td className="px-5 py-3 font-medium text-charcoal">
                  {c.full_name}
                </td>
                <td className="px-5 py-3 text-taupe">{c.email}</td>
                <td className="px-5 py-3 text-taupe">{c.phone || "—"}</td>
                <td className="px-5 py-3 text-taupe">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
