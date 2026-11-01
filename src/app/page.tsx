export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-plum/5 via-transparent to-champagne/10" />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-taupe uppercase">
            Curio By Dabby
          </p>

          <h1 className="mb-6 text-4xl font-light tracking-tight text-charcoal sm:text-5xl md:text-6xl">
            More Than Gifts.
            <br />
            <span className="text-plum">More Than Shopping.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-taupe">
            Discover thoughtful gifts and distinctive lifestyle products with our
            intelligent shopping assistant.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-plum px-8 py-3.5 text-sm font-medium text-ivory transition hover:bg-plum/90">
              Shop Now
            </button>
            <button className="rounded-full border border-plum/30 bg-white/50 px-8 py-3.5 text-sm font-medium text-plum backdrop-blur transition hover:border-plum hover:bg-white">
              Find a Gift
            </button>
          </div>
        </div>

        <p className="absolute bottom-8 text-xs tracking-widest text-taupe/70">
          STARTER IS LIVE — WE WILL BUILD THE FULL EXPERIENCE NEXT
        </p>
      </section>
    </main>
  );
}
