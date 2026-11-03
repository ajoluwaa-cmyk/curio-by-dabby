import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatNaira } from "@/types/database";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  return (
    <div>
      <Link href="/admin/orders" className="text-xs text-taupe hover:text-plum">
        ← Orders
      </Link>
      <h1 className="mt-2 mb-6 text-2xl font-light text-charcoal">{order.id}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-taupe/15 bg-white p-6">
            <h2 className="mb-3 text-sm font-medium text-charcoal">Customer</h2>
            <p className="text-sm text-charcoal">{order.customer_full_name}</p>
            <p className="text-sm text-taupe">{order.customer_email}</p>
            <p className="text-sm text-taupe">{order.customer_phone}</p>
          </div>

          <div className="rounded-2xl border border-taupe/15 bg-white p-6">
            <h2 className="mb-3 text-sm font-medium text-charcoal">Shipping</h2>
            <p className="text-sm text-charcoal">{order.shipping_address}</p>
            <p className="text-sm text-taupe">
              {order.shipping_city}, {order.shipping_state}
            </p>
            <p className="text-sm text-taupe">{order.shipping_country}</p>
            {order.shipping_note && (
              <p className="mt-2 text-sm text-taupe">Note: {order.shipping_note}</p>
            )}
            {order.gift_note && (
              <p className="mt-2 text-sm text-plum">Gift note: {order.gift_note}</p>
            )}
          </div>

          <OrderStatusForm
            orderId={order.id}
            status={order.status}
            paymentStatus={order.payment_status}
            internalNotes={order.internal_notes || ""}
          />
        </div>

        <div className="rounded-2xl border border-taupe/15 bg-white p-6">
          <h2 className="mb-4 text-sm font-medium text-charcoal">Items</h2>
          <ul className="space-y-3">
            {(items || []).map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                  {(item.selected_color || item.selected_size) && (
                    <span className="block text-xs text-taupe">
                      {[item.selected_color, item.selected_size]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  )}
                </span>
                <span>{formatNaira(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-taupe/15 pt-4 text-sm font-medium">
            <span>Subtotal</span>
            <span>{formatNaira(order.subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-taupe">
            Placed {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
