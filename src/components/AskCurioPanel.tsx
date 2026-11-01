"use client";

import { useState } from "react";

interface AskCurioPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskCurioPanel({ isOpen, onClose }: AskCurioPanelProps) {
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
        <div className="flex items-center justify-between border-b border-taupe/20 px-6 py-5">
          <div>
            <h3 className="text-lg font-medium text-plum">Ask Curio</h3>
            <p className="text-xs text-taupe">Your intelligent shopping assistant</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-charcoal hover:bg-taupe/10"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <p className="mb-6 text-sm leading-relaxed text-taupe">
            Tell me who you’re shopping for, the occasion, their interests, preferred colours, and budget. I’ll recommend real products from our collection.
          </p>

          <div className="space-y-4">
            <button className="w-full rounded-xl border border-taupe/25 bg-white px-5 py-4 text-left text-sm transition hover:border-plum/40 hover:bg-white">
              <span className="font-medium text-charcoal">Find a Gift</span>
              <p className="mt-1 text-xs text-taupe">For someone special</p>
            </button>

            <button className="w-full rounded-xl border border-taupe/25 bg-white px-5 py-4 text-left text-sm transition hover:border-plum/40 hover:bg-white">
              <span className="font-medium text-charcoal">Help Me Shop</span>
              <p className="mt-1 text-xs text-taupe">For myself</p>
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-taupe/70">
            Full AI experience coming in the next phase
          </p>
        </div>
      </div>
    </>
  );
}
