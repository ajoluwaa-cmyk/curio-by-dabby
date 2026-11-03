"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/data/products";
import { Order } from "@/types/order";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "—";
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem("curio-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
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
            Thank you. We’ve received your order and will confirm by email.
          </p>
          <p className="mb-10 text-sm font-medium text-plum">
            Order ID: {orderId}
          </p>

          {order && (
            <div className="mb-10 rounded-2xl border border-taupe/15 bg-white p-6 text-left">
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
              <div className="flex justify-between border-t border-taupe/15 pt-3 text-sm font-medium text-charcoal">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.giftNote && (
                <p className="mt-4 text-xs leading-relaxed text-taupe">
                  <span className="font-medium text-charcoal">Gift note: </span>
                  {order.giftNote}
                </p>
              )}
              <p className="mt-3 text-xs text-taupe">
                Payment status: unpaid (payment integration coming next)
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
              href="/"
              className="rounded-full border border-taupe/25 px-8 py-3.5 text-sm font-medium text-charcoal transition hover:border-plum/40"
            >
              Back home
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
