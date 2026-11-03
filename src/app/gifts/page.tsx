"use client";

import Link from "next/link";

export default function GiftsPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-plum/[0.04] via-ivory to-champagne/[0.08]" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="mb-4 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-5 text-3xl font-light tracking-tight text-charcoal md:text-5xl">
            Gifts with intention
          </h1>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-taupe md:text-base">
            Build a thoughtful gift box from our collection, add a personal
            note, and send something that feels considered — not rushed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/gifts/build"
              className="rounded-full bg-plum px-9 py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90 hover:shadow-elegant"
            >
              Start Building
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-plum/25 bg-white/70 px-9 py-3.5 text-sm font-medium text-plum transition hover:border-plum/50"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-taupe/10 bg-white/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-light tracking-tight text-charcoal">
            How it works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose pieces",
                text: "Select products from the catalogue that fit the person and the moment.",
              },
              {
                step: "02",
                title: "Add a note",
                text: "Write a short personal message to include with the gift.",
              },
              {
                step: "03",
                title: "Checkout",
                text: "Review your box, add it to cart, and complete your order.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-champagne uppercase">
                  {item.step}
                </p>
                <h3 className="mb-2 text-base font-medium text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-taupe">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curio Edits teaser */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-light tracking-tight text-charcoal">
              Curio Edits
            </h2>
            <p className="text-sm text-taupe">
              Pre-designed sets — coming as ready-to-gift collections
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Soft Glow Edit",
                subtitle: "Beauty essentials for everyday radiance",
              },
              {
                title: "Quiet Luxury Edit",
                subtitle: "Scarf, fragrance & a considered small piece",
              },
              {
                title: "Artwear Edit",
                subtitle: "Statement tee + accessory pairing",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-champagne/35 via-ivory to-plum/10 transition duration-500 hover:shadow-elegant"
              >
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-base font-medium text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-taupe">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ask Curio CTA */}
      <section className="bg-plum px-6 py-16 md:py-20">
        <div className="mx-auto max-w-xl text-center text-ivory">
          <h2 className="mb-3 text-2xl font-light md:text-3xl">
            Not sure what to choose?
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-champagne/85">
            Ask Curio for gift ideas based on who you’re buying for, the
            occasion, and your budget.
          </p>
          <Link
            href="/gifts/build"
            className="inline-block rounded-full bg-champagne px-8 py-3.5 text-sm font-medium text-plum transition hover:bg-white"
          >
            Build a Gift Box
          </Link>
        </div>
      </section>
    </main>
  );
}
