import { notFound } from "next/navigation";
import { getProductById, getAllProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.collection === product.collection)
    )
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
