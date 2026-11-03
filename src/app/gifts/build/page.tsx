"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, formatPrice } from "@/data/products";
import { Product } from "@/types/product";
import { useCart } from "@/store/cart";

type Step = 1 | 2 | 3;

interface BoxItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

function boxKey(item: BoxItem) {
  return `${item.product.id}-${item.selectedColor || ""}-${item.selectedSize || ""}`;
}

export default function BuildGiftBoxPage() {
  const router = useRouter();
  const { addItem, setGiftNote, openCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [box, setBox] = useState<BoxItem[]>([]);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Beauty", "Fashion", "Accessories", "Hair", "Originals"];

  const catalog = useMemo(() => {
    if (filter === "All") return products.filter((p) => p.inStock);
    if (filter === "Originals")
      return products.filter((p) => p.inStock && p.isOriginal);
    return products.filter(
      (p) => p.inStock && p.category.toLowerCase() === filter.toLowerCase()
    );
  }, [filter]);

  const boxTotal = box.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const addToBox = (product: Product) => {
    const color = product.colors?.[0];
    const size = product.sizes?.[0];
    setBox((prev) => {
      const key = `${product.id}-${color || ""}-${size || ""}`;
      const existing = prev.find((i) => boxKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          boxKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { product, quantity: 1, selectedColor: color, selectedSize: size },
      ];
    });
  };

  const updateBoxQty = (key: string, quantity: number) => {
    if (quantity < 1) {
      setBox((prev) => prev.filter((i) => boxKey(i) !== key));
      return;
    }
    setBox((prev) =>
      prev.map((i) => (boxKey(i) === key ? { ...i, quantity } : i))
    );
  };

  const removeFromBox = (key: string) => {
    setBox((prev) => prev.filter((i) => boxKey(i) !== key));
  };

  const handleAddBoxToCart = () => {
    box.forEach((item) => {
      addItem(
        item.product,
        item.quantity,
        item.selectedColor,
        item.selectedSize
      );
    });
    if (note.trim()) {
      setGiftNote(note.trim());
    }
    openCart();
    router.push("/checkout");
  };

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="border-b border-taupe/10 px-6 py-10 md:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Build a Gift Box
          </p>
          <h1 className="text-2xl font-light tracking-tight text-charcoal md:text-3xl">
            {step === 1 && "Choose pieces"}
            {step === 2 && "Personal note"}
            {step === 3 && "Review your box"}
          </h1>

          {/* Steps */}
          <div className="mt-6 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full ${
                  s <= step ? "bg-plum" : "bg-taupe/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div>
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-4 py-1.5 text-xs transition ${
                        filter === f
                          ? "bg-plum text-ivory"
                          : "border border-taupe/25 text-charcoal hover:border-plum/40"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {catalog.map((product) => {
                    const inBox = box.some((i) => i.product.id === product.id);
                    return (
                      <div key={product.id} className="group">
                        <div
                          className={`relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${
                            product.imageGradient ||
                            "from-champagne/30 via-ivory to-plum/10"
                          }`}
                        >
                          {product.tag && (
                            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-plum">
                              {product.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-taupe">
                          {product.category}
                        </p>
                        <h3 className="mb-1 text-sm font-medium text-charcoal">
                          {product.name}
                        </h3>
                        <p className="mb-2 text-sm text-charcoal/80">
                          {formatPrice(product.price)}
                        </p>
                        <button
                          onClick={() => addToBox(product)}
                          className={`w-full rounded-full py-2 text-xs font-medium transition ${
                            inBox
                              ? "border border-plum/40 text-plum"
                              : "bg-plum text-ivory hover:bg-plum/90"
                          }`}
                        >
                          {inBox ? "Add another" : "Add to box"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="max-w-lg">
                <p className="mb-4 text-sm text-taupe">
                  Write a short message for the gift card (optional).
                </p>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 280))}
                  rows={5}
                  placeholder="Happy birthday… Thank you for…"
                  className="w-full rounded-2xl border border-taupe/25 bg-white px-5 py-4 text-sm outline-none transition focus:border-plum"
                />
                <p className="mt-2 text-right text-xs text-taupe">
                  {note.length}/280
                </p>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <div className="space-y-4">
                  {box.map((item) => (
                    <div
                      key={boxKey(item)}
                      className="flex gap-4 rounded-2xl border border-taupe/15 bg-white p-4"
                    >
                      <div
                        className={`h-20 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${
                          item.product.imageGradient ||
                          "from-champagne/30 via-ivory to-plum/10"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-charcoal">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-taupe">
                          {item.selectedColor}
                          {item.selectedColor && item.selectedSize ? " · " : ""}
                          {item.selectedSize}
                        </p>
                        <p className="mt-1 text-sm text-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="inline-flex items-center rounded-full border border-taupe/25">
                            <button
                              onClick={() =>
                                updateBoxQty(boxKey(item), item.quantity - 1)
                              }
                              className="px-3 py-1 text-sm"
                            >
                              −
                            </button>
                            <span className="min-w-[1.5rem] text-center text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateBoxQty(boxKey(item), item.quantity + 1)
                              }
                              className="px-3 py-1 text-sm"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromBox(boxKey(item))}
                            className="text-xs text-taupe hover:text-plum"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {note.trim() && (
                  <div className="mt-6 rounded-2xl border border-plum/15 bg-plum/5 p-5">
                    <p className="mb-1 text-xs font-medium text-charcoal">
                      Gift note
                    </p>
                    <p className="text-sm leading-relaxed text-taupe">{note}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="h-fit rounded-2xl border border-taupe/15 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="mb-4 text-sm font-medium text-charcoal">Your box</h2>

            {box.length === 0 ? (
              <p className="mb-6 text-sm text-taupe">No pieces yet</p>
            ) : (
              <ul className="mb-4 max-h-48 space-y-2 overflow-y-auto text-sm">
                {box.map((item) => (
                  <li key={boxKey(item)} className="flex justify-between gap-2">
                    <span className="truncate text-charcoal">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="flex-shrink-0 text-taupe">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mb-5 flex justify-between border-t border-taupe/15 pt-3 text-sm">
              <span className="text-taupe">Total</span>
              <span className="font-medium text-charcoal">
                {formatPrice(boxTotal)}
              </span>
            </div>

            <div className="space-y-2">
              {step === 1 && (
                <button
                  disabled={box.length === 0}
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-plum py-3 text-sm font-medium text-ivory transition hover:bg-plum/90 disabled:opacity-40"
                >
                  Continue
                </button>
              )}
              {step === 2 && (
                <>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full rounded-full bg-plum py-3 text-sm font-medium text-ivory transition hover:bg-plum/90"
                  >
                    Review box
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-sm text-taupe hover:text-plum"
                  >
                    ← Back
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <button
                    disabled={box.length === 0}
                    onClick={handleAddBoxToCart}
                    className="w-full rounded-full bg-plum py-3 text-sm font-medium text-ivory transition hover:bg-plum/90 disabled:opacity-40"
                  >
                    Add box to cart & checkout
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-2 text-sm text-taupe hover:text-plum"
                  >
                    ← Back
                  </button>
                </>
              )}
            </div>

            <Link
              href="/gifts"
              className="mt-4 block text-center text-xs text-taupe hover:text-plum"
            >
              Back to Gifts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
