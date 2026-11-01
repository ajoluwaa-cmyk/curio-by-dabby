import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="group">
      <div
        className={`relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${
          product.imageGradient || "from-champagne/30 via-ivory to-plum/10"
        } transition duration-500 group-hover:shadow-elegant`}
      >
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-plum">
            {product.tag}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-charcoal/80 px-2.5 py-1 text-[10px] font-medium text-ivory">
            Sold out
          </span>
        )}
      </div>

      <div>
        <p className="mb-0.5 text-[11px] text-taupe">{product.category}</p>
        <h3 className="mb-1 text-sm font-medium text-charcoal transition group-hover:text-plum">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-charcoal/80">{formatPrice(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-taupe line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
