"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function ShippingPage() {
  const [shippingNote, setShippingNote] = useState(
    "Ships within 2–4 business days after order confirmation."
  );
  const [deliveryEstimate, setDeliveryEstimate] = useState(
    "Lagos & major cities: typically 3–6 business days total. Other locations: 5–10 business days."
  );
  const [shippingFee, setShippingFee] = useState(2500);
  const [freeMin, setFreeMin] = useState(50000);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.shippingNote) setShippingNote(d.shippingNote);
        if (d.deliveryEstimate) setDeliveryEstimate(d.deliveryEstimate);
        if (d.shippingFee != null) setShippingFee(d.shippingFee);
        if (d.freeShippingMin != null) setFreeMin(d.freeShippingMin);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-8 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Shipping & delivery
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-taupe">
            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Processing time
              </h2>
              <p>{shippingNote}</p>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Delivery estimates
              </h2>
              <p>{deliveryEstimate}</p>
              <p className="mt-2">
                Estimates start after order confirmation. Public holidays and
                courier delays may extend delivery.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Shipping fees
              </h2>
              <p>
                Standard shipping:{" "}
                <span className="text-charcoal">
                  {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                </span>
              </p>
              {freeMin > 0 && (
                <p className="mt-1">
                  Free shipping on orders from {formatPrice(freeMin)}.
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Coverage
              </h2>
              <p>
                We currently deliver across Nigeria. If your area is difficult
                to reach, we’ll contact you after the order to confirm options.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Order updates
              </h2>
              <p>
                You’ll receive confirmation when your order is placed, and
                updates when it moves to processing and shipped. Keep your phone
                and email reachable.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm text-taupe">
            See also{" "}
            <Link href="/returns" className="text-plum hover:underline">
              Returns & exchanges
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
