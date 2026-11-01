"use client";

import { useState } from "react";

interface AskCurioPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskCurioPanel({ isOpen, onClose }: AskCurioPanelProps) {
  const [step, setStep] = useState<"choice" | "gift" | "shop">("choice");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
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
            onClick={() => {
              onClose();
              setTimeout(() => setStep("choice"), 300);
            }}
            className="rounded-full p-2 text-charcoal transition hover:bg-taupe/10"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
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
                  <span className="block text-sm font-medium text-charcoal">Find a Gift</span>
                  <span className="mt-1 block text-xs text-taupe">
                    For someone special — occasion, style & budget
                  </span>
                </button>

                <button
                  onClick={() => setStep("shop")}
                  className="w-full rounded-2xl border border-taupe/20 bg-white px-5 py-5 text-left transition hover:border-plum/30 hover:shadow-soft"
                >
                  <span className="block text-sm font-medium text-charcoal">Help Me Shop</span>
                  <span className="mt-1 block text-xs text-taupe">
                    For myself — outfits, beauty, accessories & more
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === "gift" && (
            <div>
              <button
                onClick={() => setStep("choice")}
                className="mb-6 flex items-center gap-1 text-xs text-taupe transition hover:text-plum"
              >
                ← Back
              </button>

              <h4 className="mb-1 text-base font-medium text-charcoal">Find a Gift</h4>
              <p className="mb-8 text-sm text-taupe">
                Tell me a few details and I’ll recommend thoughtful pieces from our collection.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">Who is this for?</label>
                  <input
                    type="text"
                    placeholder="e.g. My sister, best friend, colleague..."
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">Occasion</label>
                  <input
                    type="text"
                    placeholder="Birthday, Thank you, Just because..."
                    className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-charcoal">Budget range</label>
                  <select className="w-full rounded-xl border border-taupe/25 bg-white px-4 py-3 text-sm outline-none transition focus:border-plum">
                    <option>Under ₦15,000</option>
                    <option>₦15,000 – ₦35,000</option>
                    <option>₦35,000 – ₦70,000</option>
                    <option>₦70,000+</option>
                  </select>
                </div>

                <button className="mt-4 w-full rounded-full bg-plum py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90">
                  Get Recommendations
                </button>
              </div>
            </div>
          )}

          {step === "shop" && (
            <div>
              <button
                onClick={() => setStep("choice")}
                className="mb-6 flex items-center gap-1 text-xs text-taupe transition hover:text-plum"
              >
                ← Back
              </button>

              <h4 className="mb-1 text-base font-medium text-charcoal">Help Me Shop</h4>
              <p className="mb-8 text-sm text-taupe">
                What are you looking for today?
              </p>

              <div className="space-y-3">
                {["Complete Outfit", "Beauty & Skincare", "Accessories", "Something New"].map((item) => (
                  <button
                    key={item}
                    className="w-full rounded-xl border border-taupe/20 bg-white px-5 py-4 text-left text-sm text-charcoal transition hover:border-plum/30"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
