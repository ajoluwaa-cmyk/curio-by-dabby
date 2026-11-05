"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const FILTERS = [
  "All",
  "Beauty",
  "Fashion",
  "Accessories",
  "Hair",
  "Originals",
] as const;

export default function ShopClient({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return products;
    if (activeFilter === "Originals")
      return products.filter((p) => p.isOriginal);
    return products.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, products]);

  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                activeFilter === filter
                  ? "bg-plum text-ivory"
                  : "border border-taupe/25 text-charcoal hover:border-plum/40"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="mb-6 text-xs text-taupe">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-taupe">
              No pieces yet. Add products in Admin.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
