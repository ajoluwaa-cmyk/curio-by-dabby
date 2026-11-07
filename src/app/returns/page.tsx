"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReturnsPage() {
  const [summary, setSummary] = useState(
    "Unused items in original condition may be returned within 7 days of delivery."
  );

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.returnsSummary) setSummary(d.returnsSummary);
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
            Returns & exchanges
          </h1>

          <div className="space-y-8 text-sm leading-relaxed text-taupe">
            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Overview
              </h2>
              <p>{summary}</p>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Conditions
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Item must be unused and in original packaging where applicable.</li>
                <li>Tags and seals intact when originally present.</li>
                <li>
                  Personalised or custom-made items may not be returnable unless
                  faulty.
                </li>
                <li>Beauty products opened for hygiene reasons may be non-returnable.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                How to start a return
              </h2>
              <ol className="list-decimal space-y-1 pl-5">
                <li>
                  Contact us via the{" "}
                  <Link href="/contact" className="text-plum hover:underline">
                    Contact
                  </Link>{" "}
                  page with your order ID.
                </li>
                <li>We confirm eligibility and return instructions.</li>
                <li>Once received and checked, we arrange exchange or next steps.</li>
              </ol>
            </div>

            <div>
              <h2 className="mb-2 text-base font-medium text-charcoal">
                Damaged or wrong item
              </h2>
              <p>
                If something arrives damaged or incorrect, contact us within 48
                hours of delivery with photos. We’ll prioritise a replacement or
                resolution.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm text-taupe">
            <Link href="/shipping" className="text-plum hover:underline">
              Shipping policy
            </Link>
            {" · "}
            <Link href="/contact" className="text-plum hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
