import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.imageUrls?.[0];

  return (
    <Link href={`/shop/${product.id}`} className="group">
      <div
        className={`relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl ${
          mainImage
            ? "bg-taupe/10"
            : `bg-gradient-to-br ${
                product.imageGradient ||
                "from-champagne/30 via-ivory to-plum/10"
              }`
        } transition duration-500 group-hover:shadow-elegant`}
      >
        {mainImage && (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
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
