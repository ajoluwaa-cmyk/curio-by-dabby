"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProductRow } from "@/types/database";

type Props = {
  product?: ProductRow | null;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [category, setCategory] = useState(product?.category || "Beauty");
  const [subcategory, setSubcategory] = useState(product?.subcategory || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [compareAt, setCompareAt] = useState(
    product?.compare_at_price?.toString() || ""
  );
  const [description, setDescription] = useState(product?.description || "");
  const [shortDescription, setShortDescription] = useState(
    product?.short_description || ""
  );
  const [tag, setTag] = useState(product?.tag || "");
  const [colors, setColors] = useState((product?.colors || []).join(", "));
  const [sizes, setSizes] = useState((product?.sizes || []).join(", "));
  const [imageUrls, setImageUrls] = useState(
    (product?.image_urls || []).join("\n")
  );
  const [imageGradient, setImageGradient] = useState(
    product?.image_gradient || ""
  );
  const [collection, setCollection] = useState(product?.collection || "");
  const [inStock, setInStock] = useState(product?.in_stock ?? true);
  const [isOriginal, setIsOriginal] = useState(product?.is_original ?? false);
  const [isLimited, setIsLimited] = useState(product?.is_limited ?? false);
  const [isVisible, setIsVisible] = useState(product?.is_visible ?? true);
  const [stockQty, setStockQty] = useState(
    product?.stock_quantity?.toString() || "0"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleNameBlur = () => {
    if (!slug && name) setSlug(slugify(name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name,
      slug: slug || slugify(name),
      category,
      subcategory: subcategory || null,
      price: parseInt(price, 10) || 0,
      compare_at_price: compareAt ? parseInt(compareAt, 10) : null,
      description,
      short_description: shortDescription,
      tag: tag || null,
      colors: colors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sizes: sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      image_urls: imageUrls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      image_gradient: imageGradient || null,
      collection: collection || null,
      in_stock: inStock,
      is_original: isOriginal,
      is_limited: isLimited,
      is_visible: isVisible,
      stock_quantity: parseInt(stockQty, 10) || 0,
    };

    const supabase = createClient();

    if (isEdit && product) {
      const { error: err } = await supabase
        .from("products")
        .update(payload)
        .eq("id", product.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from("products").insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/products");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!product || !confirm("Delete this product permanently?")) return;
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", product.id);
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-taupe/15 bg-white p-6 space-y-4">
        <h2 className="text-sm font-medium text-charcoal">Basic info</h2>
        <Field label="Name *">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            className="input"
          />
        </Field>
        <Field label="Slug *">
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="input"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category *">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              {["Beauty", "Fashion", "Accessories", "Hair", "Originals"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
          </Field>
          <Field label="Subcategory">
            <input
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="input"
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price (₦) *">
            <input
              required
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Compare at price">
            <input
              type="number"
              min={0}
              value={compareAt}
              onChange={(e) => setCompareAt(e.target.value)}
              className="input"
            />
          </Field>
        </div>
        <Field label="Short description">
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Description">
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-taupe/15 bg-white p-6 space-y-4">
        <h2 className="text-sm font-medium text-charcoal">Variants & media</h2>
        <Field label="Tag (e.g. Curio Original, Limited, New)">
          <input value={tag} onChange={(e) => setTag(e.target.value)} className="input" />
        </Field>
        <Field label="Colours (comma-separated)">
          <input value={colors} onChange={(e) => setColors(e.target.value)} className="input" />
        </Field>
        <Field label="Sizes (comma-separated)">
          <input value={sizes} onChange={(e) => setSizes(e.target.value)} className="input" />
        </Field>
        <Field label="Collection (signature / artwear / colour-stories / adire)">
          <input
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Image URLs (one per line — Supabase Storage or external)">
          <textarea
            rows={3}
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </Field>
        <Field label="Fallback gradient class (optional)">
          <input
            value={imageGradient}
            onChange={(e) => setImageGradient(e.target.value)}
            className="input"
            placeholder="from-champagne/30 via-ivory to-plum/10"
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-taupe/15 bg-white p-6 space-y-4">
        <h2 className="text-sm font-medium text-charcoal">Inventory & flags</h2>
        <Field label="Stock quantity">
          <input
            type="number"
            min={0}
            value={stockQty}
            onChange={(e) => setStockQty(e.target.value)}
            className="input"
          />
        </Field>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
            In stock
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
            Visible on store
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isOriginal} onChange={(e) => setIsOriginal(e.target.checked)} />
            Curio Original
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isLimited} onChange={(e) => setIsLimited(e.target.checked)} />
            Limited edition
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-plum px-8 py-3 text-sm font-medium text-ivory hover:bg-plum/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Update product" : "Create product"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-red-200 px-6 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        )}
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(168, 148, 131, 0.25);
          background: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        :global(.input:focus) {
          border-color: #54263f;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-charcoal">
        {label}
      </label>
      {children}
    </div>
  );
}
