import { getAllProducts } from "@/lib/products";
import ShopClient from "@/components/ShopClient";

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="pt-16">
      <section className="border-b border-taupe/10 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-[11px] font-medium tracking-[0.25em] text-taupe uppercase">
            Curio By Dabby
          </p>
          <h1 className="mb-4 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Shop
          </h1>
          <p className="mx-auto max-w-md text-sm text-taupe">
            Distinctive lifestyle pieces, original collections, and thoughtful
            finds.
          </p>
        </div>
      </section>

      <ShopClient products={products} />
    </main>
  );
}
