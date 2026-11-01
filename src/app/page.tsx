"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/curiobydabby%20homepage%20video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-charcoal/50" />

        {/* Soft brand gradient on top */}
        <div className="absolute inset-0 bg-gradient-to-b from-plum/25 via-transparent to-charcoal/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-5 text-[11px] font-medium tracking-[0.28em] text-champagne uppercase"
          >
            Curio By Dabby
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mb-6 text-[2.75rem] font-light leading-[1.12] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            More Than Gifts.
            <br />
            <span className="text-champagne">More Than Shopping.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mb-11 max-w-lg text-base leading-relaxed text-ivory/85 sm:text-lg"
          >
            Discover distinctive lifestyle pieces and thoughtful gifts — guided
            by an intelligent assistant that understands intention.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col items-center justify-center gap-3.5 sm:flex-row"
          >
            <Link
              href="/shop"
              className="rounded-full bg-plum px-9 py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90 hover:shadow-elegant"
            >
              Shop Now
            </Link>
            <Link
              href="/gifts"
              className="rounded-full border border-ivory/40 bg-white/10 px-9 py-3.5 text-sm font-medium text-ivory backdrop-blur transition hover:border-ivory hover:bg-white/20"
            >
              Find a Gift
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="mb-3 text-2xl font-light tracking-tight text-charcoal md:text-3xl">
              Explore Curio
            </h2>
            <p className="text-sm text-taupe">
              Carefully curated for every intention
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Beauty", href: "/shop/beauty" },
              { name: "Fashion", href: "/shop/fashion" },
              { name: "Adire", href: "/collections/adire" },
              { name: "Accessories", href: "/shop/accessories" },
              { name: "Gifting", href: "/gifts" },
              { name: "Originals", href: "/collections" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-taupe/15 bg-white/60 transition duration-300 hover:border-plum/25 hover:bg-white hover:shadow-soft"
              >
                <span className="text-sm font-medium text-charcoal transition group-hover:text-plum">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AI ASSISTANT ================= */}
      <section className="bg-plum px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center text-ivory">
          <p className="mb-4 text-[11px] tracking-[0.22em] text-champagne uppercase">
            Intelligent Shopping
          </p>
          <h2 className="mb-5 text-2xl font-light leading-snug md:text-4xl">
            Meet Your Personal
            <br className="hidden sm:block" /> Shopping Assistant
          </h2>
          <p className="mx-auto mb-9 max-w-md text-sm leading-relaxed text-champagne/85 md:text-base">
            Tell Curio who you’re buying for, the occasion, their style and
            budget. Receive thoughtful recommendations from real products in our
            collection.
          </p>
          <button className="rounded-full bg-champagne px-8 py-3.5 text-sm font-medium text-plum transition hover:bg-white">
            Ask Curio
          </button>
        </div>
      </section>

      {/* ================= CURIO EXCLUSIVES ================= */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-2xl font-light tracking-tight text-charcoal md:text-3xl">
                Curio Exclusives
              </h2>
              <p className="text-sm text-taupe">
                Original collections designed with intention
              </p>
            </div>
            <Link
              href="/collections"
              className="text-sm font-medium text-plum underline-offset-4 transition hover:underline"
            >
              View all collections →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Signature Collection",
                subtitle: "Subtle logo + distinctive artwork",
              },
              {
                title: "Artwear",
                subtitle: "Contemporary African illustration",
              },
              {
                title: "Colour Stories",
                subtitle: "Coordinated drops & limited editions",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-champagne/35 via-ivory to-plum/10 transition duration-500 hover:shadow-elegant"
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

      {/* ================= BUILD A GIFT ================= */}
      <section className="border-y border-taupe/10 bg-white/40 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-3 text-2xl font-light tracking-tight text-charcoal md:text-3xl">
            Build Your Own Gift Box
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-taupe">
            Select pieces you love, add a personal note, and create a gift that
            feels intentional.
          </p>
          <Link
            href="/gifts/build"
            className="inline-block rounded-full border border-plum/80 px-8 py-3.5 text-sm font-medium text-plum transition hover:bg-plum hover:text-ivory"
          >
            Start Building
          </Link>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-3 text-xl font-light text-charcoal md:text-2xl">
            Stay Close to Curio
          </h2>
          <p className="mb-7 text-sm text-taupe">
            New drops, exclusive offers and thoughtful inspiration.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-taupe/25 bg-white px-5 py-3 text-sm outline-none transition focus:border-plum"
            />
            <button
              type="submit"
              className="rounded-full bg-plum px-7 py-3 text-sm font-medium text-ivory transition hover:bg-plum/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-taupe/15 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-plum">Curio By Dabby</p>
            <p className="mt-0.5 text-xs text-taupe">
              More Than Gifts. More Than Shopping.
            </p>
          </div>
          <div className="flex gap-7 text-sm text-taupe">
            <Link href="/about" className="transition hover:text-plum">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-plum">
              Contact
            </Link>
            <Link href="/shipping" className="transition hover:text-plum">
              Shipping
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
