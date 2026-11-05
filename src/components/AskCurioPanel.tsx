"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  fetchProductsClient,
  filterProductsForGift,
  formatPrice,
} from "@/lib/products-client";
import { Product } from "@/types/product";

interface AskCurioPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "choice" | "gift" | "shop" | "results";

export default function AskCurioPanel({ isOpen, onClose }: AskCurioPanelProps) {
  const [step, setStep] = useState<Step>("choice");
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("under-15");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep("choice");
      setRecipient("");
      setOccasion("");
      setBudget("under-15");
      setResults([]);
    }, 300);
  };

  const getBudgetMax = (value: string): number => {
    switch (value) {
      case "under-15":
        return 15000;
      case "15-35":
        return 35000;
      case "35-70":
        return 70000;
      case "70-plus":
        return 999999;
      default:
        return 70000;
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    const all = await fetchProductsClient();
    const matched = filterProductsForGift({
      products: all,
      budgetMax: getBudgetMax(budget),
    }).slice(0, 6);
    setResults(matched);
    setLoading(false);
    setStep("results");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
        onClick={resetAndClose}
      />
      <div className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
          <div>
            <h3 className="text-lg font-medium text-plum">Ask Curio</h3>
            <p className="text-xs text-taupe">Your intelligent shopping assistant</p>
          </div>
          <button
            onClick={resetAndClose}
            className="rounded-full p-2 text-charcoal hover:bg-taupe/10"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {step === "choice" && (
            <div className="space-y-3">
              <p className="mb-6 text-sm text-taupe">How can I help you today?</p>
              <button
                onClick={() => setStep("gift")}
                className="w-full rounded-2xl border border-taupe/20 bg-white px-5 py-5 text-left hover:border-plum/30"
              >
                <span className="block text-sm font-medium text-charcoal">Find a Gift</span>
                <span className="mt-1 block text-xs text-taupe">Occasion, style & budget</span>
              </button>
              <button
                onClick={() => setStep("shop")}
                className="w-full rounded-2xl border border-taupe/20 bg-white px-5 py-5 text-left hover:border-plum/30"
              >
                <span className="block text-sm font-medium text-charcoal">Help Me Shop</span>
                <span className="mt-1 block text-xs text-taupe">For myself</span>
              </button>
            </div>
          )}

          {step === "gift" && (
            <div>
              <button onClick={() => setStep("choice")} className="mb-6 text-xs text-taupe">
                ← Back
              </button>
              <h4 className="mb-6 text-base font-medium text-charcoal">Find a Gift</h4>
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Who is this for?</label>
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
                    placeholder="Sister, friend…"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Occasion</label>
                  <input
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
                    placeholder="Birthday…"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 px-4 py-3 text-sm outline-none focus:border-plum"
                  >
                    <option value="under-15">Under ₦15,000</option>
                    <option value="15-35">₦15,000 – ₦35,000</option>
                    <option value="35-70">₦35,000 – ₦70,000</option>
                    <option value="70-plus">₦70,000+</option>
                  </select>
                </div>
                <button
                  onClick={handleGetRecommendations}
                  disabled={loading}
                  className="w-full rounded-full bg-plum py-3.5 text-sm font-medium text-ivory disabled:opacity-60"
                >
                  {loading ? "Finding…" : "Get Recommendations"}
                </button>
              </div>
            </div>
          )}

          {step === "shop" && (
            <div>
              <button onClick={() => setStep("choice")} className="mb-6 text-xs text-taupe">
                ← Back
              </button>
              <div className="space-y-3">
                <Link
                  href="/shop"
                  onClick={resetAndClose}
                  className="block rounded-xl border border-taupe/20 bg-white px-5 py-4 text-sm"
                >
                  Browse full shop
                </Link>
              </div>
            </div>
          )}

          {step === "results" && (
            <div>
              <button onClick={() => setStep("gift")} className="mb-6 text-xs text-taupe">
                ← Back
              </button>
              <h4 className="mb-4 text-base font-medium text-charcoal">Suggestions</h4>
              {results.length === 0 ? (
                <p className="text-sm text-taupe">No matches in that budget.</p>
              ) : (
                <div className="space-y-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      onClick={resetAndClose}
                      className="flex gap-3 rounded-2xl border border-taupe/15 bg-white p-3"
                    >
                      <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-taupe/10">
                        {product.imageUrls?.[0] ? (
                          <Image
                            src={product.imageUrls[0]}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-charcoal">
                          {product.name}
                        </p>
                        <p className="text-xs text-taupe">{product.category}</p>
                        <p className="text-sm">{formatPrice(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
