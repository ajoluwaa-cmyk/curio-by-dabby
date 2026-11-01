"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* ========== HERO ========== */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-plum/[0.04] via-ivory to-champagne/[0.09]" />
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-champagne/25 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[420px] w-[420px] rounded-full bg-plum/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs font-medium tracking-[0.25em] text-taupe uppercase"
          >
            Curio By Dabby
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 text-5xl font-light leading-[1.1] tracking-tight text-charcoal sm:text-6xl md:text-7xl"
          >
            More Than Gifts.
            <br />
            <span className="text-plum">More Than Shopping.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-taupe"
          >
            Discover distinctive lifestyle pieces and thoughtful gifts — 
            guided by an intelligent assistant that understands intention.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/shop"
              className="rounded-full bg-plum px-10 py-4 text-sm font-medium text-ivory transition hover:bg-plum/90 hover:shadow-elegant"
            >
              Shop Now
            </Link>
            <Link
              href="/gifts"
              className="rounded-full border border-plum/25 bg-white/60 px-10 py-4 text-sm font-medium text-plum backdrop-blur transition hover:border-plum hover:bg-white"
            >
              Find a Gift
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== CATEGORY EXPLORER ========== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-light text-charcoal md:text-4xl">
              Explore the World of Curio
            </h2>
            <p className="text-taupe">Carefully curated categories for every intention</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
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
                className="group flex aspect-[4/5] flex-col items-center justify-center rounded-2xl border border-taupe/20 bg-white/50 transition duration-300 hover:border-plum/30 hover:bg-white hover:shadow-soft"
              >
                <span className="text-sm font-medium text-charcoal transition group-hover:text-plum">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AI ASSISTANT ========== */}
      <section className="bg-plum px-6 py-24 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs tracking-[0.2em] text-champagne uppercase">
            Intelligent Shopping
          </p>
          <h2 className="mb-6 text-3xl font-light md:text-5xl">
            Meet Your Personal Shopping Assistant
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-champagne/90">
            Tell Curio who you’re buying for, the occasion, their style and budget. 
            Receive thoughtful, real-product recommendations in seconds.
          </p>
          <button className="rounded-full bg-champagne px-10 py-4 text-sm font-medium text-plum transition hover:bg-white">
            Ask Curio
          </button>
        </div>
      </section>

      {/* ========== CURIO EXCLUSIVES ========== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-3xl font-light text-charcoal md:text-4xl">
                Curio Exclusives
              </h2>
              <p className="text-taupe">Original collections designed with intention</p>
            </div>
            <Link href="/collections" className="text-sm font-medium text-plum underline-offset-4 hover:underline">
              View all collections →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {["Signature Collection", "Artwear", "Colour Stories"].map((title) => (
              <div
                key={title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-champagne/40 to-plum/15 transition duration-500 hover:shadow-elegant"
              >
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-medium text-charcoal">{title}</h3>
                    <p className="mt-1 text-sm text-taupe">Explore collection</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUILD YOUR GIFT BOX ========== */}
      <section className="border-y border-taupe/15 bg-white/50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-light text-charcoal md:text-4xl">
            Build Your Own Gift Box
          </h2>
          <p className="mb-10 text-taupe">
            Select pieces you love, add a personal note, and create a gift that feels intentional.
          </p>
          <Link
            href="/gifts/build"
            className="inline-block rounded-full border border-plum px-10 py-4 text-sm font-medium text-plum transition hover:bg-plum hover:text-ivory"
          >
            Start Building
          </Link>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-3 text-2xl font-light text-charcoal">
            Stay Close to Curio
          </h2>
          <p className="mb-8 text-taupe">
            New drops, exclusive offers and thoughtful inspiration — delivered with care.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-taupe/30 bg-white px-6 py-3.5 text-sm outline-none transition focus:border-plum"
            />
            <button
              type="submit"
              className="rounded-full bg-plum px-8 py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-taupe/20 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-plum">Curio By Dabby</p>
            <p className="mt-1 text-xs text-taupe">More Than Gifts. More Than Shopping.</p>
          </div>
          <div className="flex gap-8 text-sm text-taupe">
            <Link href="/about" className="hover:text-plum">About</Link>
            <Link href="/contact" className="hover:text-plum">Contact</Link>
            <Link href="/shipping" className="hover:text-plum">Shipping</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
