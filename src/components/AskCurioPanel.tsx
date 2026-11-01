"use client";

import { useState } from "react";
import Link from "next/link";
import { filterProductsForGift, formatPrice } from "@/data/products";
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

  const handleGetRecommendations = () => {
    const budgetMax = getBudgetMax(budget);
    const matched = filterProductsForGift({
      budgetMax,
      occasion: occasion.trim() || undefined,
    }).slice(0, 6);

    setResults(matched);
    setStep("results");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
        onClick={resetAndClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
          <div>
            <h3 className="text-lg font-medium text-plum">Ask Curio</h3>
            <p className="text-xs text-taupe">Your intelligent shopping assistant</p>
          </div>
          <button
            onClick={resetAndClose}
            className="rounded-full p-2 text-charcoal transition hover:bg-taupe/10"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* ===== CHOICE ===== */}
          {step === "choice" && (
            <div>
              <p className="mb-8 text-sm leading-relaxed text-taupe">
                How can I help you today?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setStep("gift")}
                  className="w-full rounded-2xl border border-taupe/20 bg-white px-5 py-5 text-left transition hover:border-plum/30 hover:shadow-soft"
                >
                  <span className="block text-sm font-medium text-charcoal">
                    Find a Gift
                  </span>
                  <span className="mt-1 block text-xs text-taupe">
                    For someone special — occasion, style & budget
                  </span>
                </button>
                <button
                  onClick={() => setStep("shop")}
                  className="w-full rounded-2xl border border-taupe/20 bg-white px-5 py-5 text-left transition hover:border-plum/30 hover:shadow-soft"
                >
                  <span className="block text-sm font-medium text-charcoal">
                    Help Me Shop
                  </span>
                  <span className="mt-1 block text-xs text-taupe">
                    For myself — outfits, beauty, accessories & more
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ===== GIFT FORM ===== */}
          {step === "gift" && (
            <div>
              <button
                onClick={() => setStep("choice")}
                className="mb-6 flex items-center gap-1 text-xs text-taupe transition hover:text-plum"
              >
                ← Back
              </button>
              <h4 className="mb-1 text-base font-medium text-charcoal">
                Find a Gift
              </h4>
              <p className="mb-8 text-sm text-taupe">
                Tell me a few details and I’ll recommend thoughtful pieces from
                our collection.
              </p>
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Who is this for?
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. My sister, best friend, colleague..."
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="Birthday, Thank you, Just because..."
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">
                    Budget range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                  >
                    <option value="under-15">Under ₦15,000</option>
                    <option value="15-35">₦15,000 – ₦35,000</option>
                    <option value="35-70">₦35,000 – ₦70,000</option>
                    <option value="70-plus">₦70,000+</option>
                  </select>
                </div>
                <button
                  onClick={handleGetRecommendations}
                  className="mt-4 w-full rounded-full bg-plum py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90"
                >
                  Get Recommendations
                </button>
              </div>
            </div>
          )}

          {/* ===== HELP ME SHOP ===== */}
          {step === "shop" && (
            <div>
              <button
                onClick={() => setStep("choice")}
                className="mb-6 flex items-center gap-1 text-xs text-taupe transition hover:text-plum"
              >
                ← Back
              </button>
              <h4 className="mb-1 text-base font-medium text-charcoal">
                Help Me Shop
              </h4>
              <p className="mb-8 text-sm text-taupe">
                What are you looking for today?
              </p>
              <div className="space-y-3">
                {[
                  { label: "Complete Outfit", href: "/shop" },
                  { label: "Beauty & Skincare", href: "/shop" },
                  { label: "Accessories", href: "/shop" },
                  { label: "Something New", href: "/shop" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={resetAndClose}
                    className="block w-full rounded-xl border border-taupe/20 bg-white px-5 py-4 text-left text-sm text-charcoal transition hover:border-plum/30"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ===== RESULTS ===== */}
          {step === "results" && (
            <div>
              <button
                onClick={() => setStep("gift")}
                className="mb-6 flex items-center gap-1 text-xs text-taupe transition hover:text-plum"
              >
                ← Back
              </button>
              <h4 className="mb-1 text-base font-medium text-charcoal">
                Suggestions for you
              </h4>
              <p className="mb-6 text-sm text-taupe">
                {recipient
                  ? `Thoughtful picks${
                      occasion ? ` for a ${occasion}` : ""
                    } — ${recipient}.`
                  : "Pieces that fit your brief, prioritising Curio originals."}
              </p>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-taupe/15 bg-white p-6 text-center">
                  <p className="text-sm text-taupe">
                    No exact matches in that budget. Try widening the range or
                    browse the full shop.
                  </p>
                  <Link
                    href="/shop"
                    onClick={resetAndClose}
                    className="mt-4 inline-block text-sm font-medium text-plum underline-offset-4 hover:underline"
                  >
                    Browse all products →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      onClick={resetAndClose}
                      className="flex gap-4 rounded-2xl border border-taupe/15 bg-white p-3 transition hover:border-plum/25 hover:shadow-soft"
                    >
                      <div
                        className={`h-20 w-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${
                          product.imageGradient ||
                          "from-champagne/30 via-ivory to-plum/10"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-charcoal">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-taupe">
                          {product.category}
                          {product.tag ? ` · ${product.tag}` : ""}
                        </p>
                        <p className="mt-1 text-sm text-charcoal">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/shop"
                onClick={resetAndClose}
                className="mt-8 block text-center text-sm font-medium text-plum underline-offset-4 hover:underline"
              >
                Browse all products →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
