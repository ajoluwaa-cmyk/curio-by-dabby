import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="pt-16">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-6 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            About
          </h1>
          <div className="space-y-5 text-sm leading-relaxed text-taupe md:text-base">
            <p>
              Curio By Dabby is a lifestyle house built around intention —
              distinctive pieces, thoughtful gifts, and an experience that feels
              considered rather than rushed.
            </p>
            <p>
              We believe shopping can be more than a transaction: it can help
              you express care, celebrate moments, and discover objects that
              feel personal.
            </p>
            <p>
              From original collections to curated finds, every product is
              chosen to sit well in real life — and our assistant, Curio, exists
              to guide you when you need a second opinion.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-plum px-7 py-3 text-sm font-medium text-ivory hover:bg-plum/90"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-taupe/25 px-7 py-3 text-sm font-medium text-charcoal hover:border-plum/40"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
