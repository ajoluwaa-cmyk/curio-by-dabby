"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, giftNote, clearCart, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [shippingNote, setShippingNote] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace("/shop");
    }
  }, [mounted, items.length, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        customer: { fullName, email, phone },
        shipping: {
          address,
          city,
          state,
          country: "Nigeria",
          note: shippingNote || undefined,
        },
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize,
        })),
        subtotal: totalPrice(),
        giftNote: giftNote || undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // Keep a local copy for success page / future admin
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "curio-last-order",
          JSON.stringify(data.order)
        );
      }

      clearCart();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center pt-16">
        <p className="text-sm text-taupe">Loading checkout…</p>
      </main>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="pt-16">
      <section className="border-b border-taupe/10 px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-taupe">
            Payment will be enabled soon. Place your order and we’ll confirm by
            email.
          </p>
        </div>
      </section>

      <section className="px-6 py-10 md:py-14">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_360px]"
        >
          {/* Form */}
          <div className="space-y-8">
            {/* Contact */}
            <div className="rounded-2xl border border-taupe/15 bg-white/60 p-6">
              <h2 className="mb-5 text-base font-medium text-charcoal">
                Contact
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Full name *
                  </label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-charcoal">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-charcoal">
                      Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                      placeholder="080…"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-2xl border border-taupe/15 bg-white/60 p-6">
              <h2 className="mb-5 text-base font-medium text-charcoal">
                Shipping
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Address *
                  </label>
                  <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-charcoal">
                      City *
                    </label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-charcoal">
                      State *
                    </label>
                    <input
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Delivery note (optional)
                  </label>
                  <textarea
                    value={shippingNote}
                    onChange={(e) => setShippingNote(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                    placeholder="Landmark, preferred time…"
                  />
                </div>
              </div>
            </div>

            {giftNote && (
              <div className="rounded-2xl border border-plum/15 bg-plum/5 p-6">
                <h2 className="mb-2 text-base font-medium text-charcoal">
                  Gift note
                </h2>
                <p className="text-sm leading-relaxed text-taupe">{giftNote}</p>
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl border border-taupe/15 bg-white p-6 lg:sticky lg:top-24">
            <h2 className="mb-5 text-base font-medium text-charcoal">
              Order summary
            </h2>
            <div className="mb-5 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3"
                >
                  <div
                    className={`h-16 w-14 flex-shrink-0 rounded-lg bg-gradient-to-br ${
                      item.product.imageGradient ||
                      "from-champagne/30 via-ivory to-plum/10"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-taupe">
                      Qty {item.quantity}
                      {item.selectedColor ? ` · ${item.selectedColor}` : ""}
                      {item.selectedSize ? ` · ${item.selectedSize}` : ""}
                    </p>
                    <p className="text-sm text-charcoal">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-taupe/15 pt-4 text-sm">
              <div className="flex justify-between text-taupe">
                <span>Items ({totalItems()})</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-taupe">
                <span>Shipping</span>
                <span>Calculated later</span>
              </div>
              <div className="flex justify-between border-t border-taupe/15 pt-3 text-base font-medium text-charcoal">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-plum py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90 disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>

            <Link
              href="/shop"
              className="mt-4 block text-center text-sm text-taupe hover:text-plum"
            >
              Continue shopping
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
