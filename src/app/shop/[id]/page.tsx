"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, formatPrice, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.collection === product.collection)
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <main className="pt-16">
      <div className="border-b border-taupe/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-2 text-xs text-taupe">
          <Link href="/shop" className="transition hover:text-plum">
            Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.category}</span>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>
      </div>

      <section className="px-6 py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${
                product.imageGradient || "from-champagne/30 via-ivory to-plum/10"
              }`}
            >
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium tracking-wide text-plum">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl bg-gradient-to-br ${
                    product.imageGradient || "from-champagne/20 via-ivory to-plum/5"
                  } ${i === 0 ? "ring-2 ring-plum/40" : "opacity-60"}`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-taupe uppercase">
              {product.category}
              {product.subcategory ? ` · ${product.subcategory}` : ""}
            </p>

            <h1 className="mb-3 text-2xl font-light tracking-tight text-charcoal md:text-3xl">
              {product.name}
            </h1>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-xl text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-taupe line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mb-8 text-sm leading-relaxed text-taupe">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="mb-2.5 text-xs font-medium text-charcoal">
                  Colour
                  {selectedColor ? (
                    <span className="ml-2 font-normal text-taupe">{selectedColor}</span>
                  ) : null}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-4 py-2 text-xs transition ${
                        selectedColor === color
                          ? "border-plum bg-plum/5 text-plum"
                          : "border-taupe/25 text-charcoal hover:border-plum/40"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="mb-2.5 text-xs font-medium text-charcoal">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] rounded-full border px-4 py-2 text-xs transition ${
                        selectedSize === size
                          ? "border-plum bg-plum/5 text-plum"
                          : "border-taupe/25 text-charcoal hover:border-plum/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="mb-2.5 text-xs font-medium text-charcoal">Quantity</p>
              <div className="inline-flex items-center rounded-full border border-taupe/25">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-sm text-charcoal transition hover:text-plum"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2.5rem] text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-sm text-charcoal transition hover:text-plum"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full rounded-full py-3.5 text-sm font-medium transition ${
                  product.inStock
                    ? "bg-plum text-ivory hover:bg-plum/90 hover:shadow-elegant"
                    : "cursor-not-allowed bg-taupe/30 text-taupe"
                }`}
              >
                {!product.inStock
                  ? "Sold Out"
                  : added
                    ? "Added to Cart ✓"
                    : "Add to Cart"}
              </button>

              <button className="w-full rounded-full border border-plum/30 py-3.5 text-sm font-medium text-plum transition hover:border-plum hover:bg-plum/5">
                Add to Gift Box
              </button>
            </div>

            <div className="mt-8 space-y-2 border-t border-taupe/15 pt-6 text-xs text-taupe">
              {product.isOriginal && (
                <p>Curio Original — designed with intention</p>
              )}
              {product.isLimited && <p>Limited edition — small batch release</p>}
              <p>Ships within 2–4 business days</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-taupe/10 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-light tracking-tight text-charcoal md:text-2xl">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
