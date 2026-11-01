import Link from "next/link";

const mockProducts = [
  {
    id: 1,
    name: "Champagne Glow Lip Oil",
    category: "Beauty",
    price: "₦12,500",
    tag: "Curio Original",
  },
  {
    id: 2,
    name: "Earth Tone Adire Wrap",
    category: "Fashion",
    price: "₦28,000",
    tag: "Limited",
  },
  {
    id: 3,
    name: "Soft Plum Silk Scarf",
    category: "Accessories",
    price: "₦15,800",
    tag: null,
  },
  {
    id: 4,
    name: "Midnight Hoodie",
    category: "Fashion",
    price: "₦32,000",
    tag: "Signature",
  },
  {
    id: 5,
    name: "Warm Ivory Bonnet",
    category: "Hair",
    price: "₦8,500",
    tag: null,
  },
  {
    id: 6,
    name: "Sculpted Gold Hoops",
    category: "Accessories",
    price: "₦11,200",
    tag: "New",
  },
  {
    id: 7,
    name: "Artwear Oversized Tee",
    category: "Fashion",
    price: "₦18,500",
    tag: "Artwear",
  },
  {
    id: 8,
    name: "Perfume Oil – Dusk",
    category: "Beauty",
    price: "₦14,000",
    tag: "Curio Original",
  },
];

export default function ShopPage() {
  return (
    <main className="pt-16">
      {/* Page Header */}
      <section className="border-b border-taupe/10 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-4 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Shop
          </h1>
          <p className="mx-auto max-w-md text-sm text-taupe">
            Distinctive lifestyle pieces, original collections, and thoughtful finds.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Simple Filter Bar */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            {["All", "Beauty", "Fashion", "Accessories", "Originals"].map((filter) => (
              <button
                key={filter}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  filter === "All"
                    ? "bg-plum text-ivory"
                    : "border border-taupe/25 text-charcoal hover:border-plum/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-7">
            {mockProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group"
              >
                {/* Image Placeholder */}
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-champagne/30 via-ivory to-plum/10 transition duration-500 group-hover:shadow-elegant">
                  {product.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-plum">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="mb-0.5 text-[11px] text-taupe">{product.category}</p>
                  <h3 className="mb-1 text-sm font-medium text-charcoal transition group-hover:text-plum">
                    {product.name}
                  </h3>
                  <p className="text-sm text-charcoal/80">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
