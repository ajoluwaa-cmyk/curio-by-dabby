"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/format";

type LastOrder = {
  id: string;
  items?: { name: string; quantity: number; price: number }[];
  subtotal?: number;
  giftNote?: string;
  customer?: { email?: string; phone?: string };
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "—";
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [shippingNote, setShippingNote] = useState(
    "Ships within 2–4 business days after order confirmation."
  );
  const [deliveryEstimate, setDeliveryEstimate] = useState(
    "Lagos & major cities: typically 3–6 business days total. Other locations: 5–10 business days."
  );

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("curio-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.shippingNote) setShippingNote(d.shippingNote);
        if (d.deliveryEstimate) setDeliveryEstimate(d.deliveryEstimate);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-3 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Order received
          </h1>
          <p className="mb-2 text-sm text-taupe">
            Thank you. We’ve received your order and will confirm shortly.
          </p>
          <p className="mb-8 text-sm font-medium text-plum">
            Order ID: {orderId}
          </p>

          <div className="mb-8 rounded-2xl border border-plum/15 bg-plum/5 p-5 text-left">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-charcoal">
              What happens next
            </p>
            <ol className="list-decimal space-y-1.5 pl-4 text-sm text-taupe">
              <li>We confirm your order (email or WhatsApp).</li>
              <li>{shippingNote}</li>
              <li>{deliveryEstimate}</li>
              <li>You’ll get updates when your order is processing and shipped.</li>
            </ol>
          </div>

          {order?.items && (
            <div className="mb-8 rounded-2xl border border-taupe/15 bg-white p-6 text-left">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-taupe">
                Summary
              </p>
              <ul className="mb-4 space-y-2 text-sm text-charcoal">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between gap-3">
                    <span className="truncate">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              {order.subtotal != null && (
                <div className="flex justify-between border-t border-taupe/15 pt-3 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
              )}
              {order.giftNote && (
                <p className="mt-3 text-xs text-taupe">
                  <span className="font-medium text-charcoal">Gift note: </span>
                  {order.giftNote}
                </p>
              )}
              <p className="mt-3 text-xs text-taupe">
                Payment: unpaid until Paystack is enabled at launch.
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="rounded-full bg-plum px-8 py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90"
            >
              Continue shopping
            </Link>
            <Link
              href="/shipping"
              className="rounded-full border border-taupe/25 px-8 py-3.5 text-sm font-medium text-charcoal transition hover:border-plum/40"
            >
              Shipping info
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[50vh] items-center justify-center pt-16">
          <p className="text-sm text-taupe">Loading…</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
