"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const images = product.imageUrls?.length
    ? product.imageUrls
    : ([] as string[]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, quantity, selectedColor, selectedSize);
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
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl ${
                images[activeImage]
                  ? "bg-taupe/10"
                  : `bg-gradient-to-br ${
                      product.imageGradient ||
                      "from-champagne/30 via-ivory to-plum/10"
                    }`
              }`}
            >
              {images[activeImage] && (
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-plum">
                  {product.tag}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden rounded-xl ${
                      i === activeImage ? "ring-2 ring-plum/50" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
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
                  Colour{" "}
                  {selectedColor && (
                    <span className="font-normal text-taupe">
                      {selectedColor}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-4 py-2 text-xs transition ${
                        selectedColor === color
                          ? "border-plum bg-plum/5 text-plum"
                          : "border-taupe/25 text-charcoal"
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
                      className={`min-w-[3rem] rounded-full border px-4 py-2 text-xs ${
                        selectedSize === size
                          ? "border-plum bg-plum/5 text-plum"
                          : "border-taupe/25 text-charcoal"
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
                  className="px-4 py-2 text-sm"
                >
                  −
                </button>
                <span className="min-w-[2.5rem] text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-sm"
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
                    ? "bg-plum text-ivory hover:bg-plum/90"
                    : "cursor-not-allowed bg-taupe/30 text-taupe"
                }`}
              >
                {!product.inStock
                  ? "Sold Out"
                  : added
                    ? "Added to Cart ✓"
                    : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-taupe/10 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-xl font-light text-charcoal">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
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
