import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-xs text-taupe hover:text-plum">
          ← Products
        </Link>
        <h1 className="mt-2 text-2xl font-light text-charcoal">Add product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
