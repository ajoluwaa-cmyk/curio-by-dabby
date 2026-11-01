import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Champagne Glow Lip Oil",
    slug: "champagne-glow-lip-oil",
    category: "Beauty",
    subcategory: "Lips",
    price: 12500,
    description:
      "A luminous lip oil that delivers a soft champagne sheen with nourishing botanicals. Lightweight, non-sticky, and made for everyday glow. Wear alone or layer over your favourite lipstick.",
    shortDescription: "Luminous lip oil with a soft champagne sheen.",
    tag: "Curio Original",
    colors: ["Champagne"],
    inStock: true,
    isOriginal: true,
    isLimited: false,
    occasionTags: ["birthday", "thank you", "just because", "self care"],
    styleTags: ["beauty", "glow", "everyday", "feminine"],
    imageGradient: "from-champagne/40 via-ivory to-plum/10",
  },
  {
    id: "2",
    name: "Earth Tone Adire Wrap",
    slug: "earth-tone-adire-wrap",
    category: "Fashion",
    subcategory: "Adire",
    price: 28000,
    description:
      "Hand-dyed Adire wrap in rich earth tones. Versatile enough to wear as a dress, cover-up or styled over trousers. Each piece carries unique resist-dye character — no two are identical.",
    shortDescription: "Hand-dyed Adire wrap in rich earth tones.",
    tag: "Limited",
    colors: ["Earth", "Terracotta", "Olive"],
    sizes: ["One Size"],
    inStock: true,
    isOriginal: true,
    isLimited: true,
    collection: "adire",
    occasionTags: ["birthday", "anniversary", "cultural", "special occasion"],
    styleTags: ["adire", "african", "statement", "versatile", "fashion"],
    imageGradient: "from-champagne/50 via-taupe/20 to-plum/15",
  },
  {
    id: "3",
    name: "Soft Plum Silk Scarf",
    slug: "soft-plum-silk-scarf",
    category: "Accessories",
    subcategory: "Scarves",
    price: 15800,
    description:
      "A lightweight silk scarf in our signature soft plum. Perfect for neck, bag or hair. Subtle sheen and generous size for multiple styling options.",
    shortDescription: "Lightweight silk scarf in signature soft plum.",
    tag: null,
    colors: ["Plum"],
    inStock: true,
    isOriginal: false,
    isLimited: false,
    occasionTags: ["thank you", "just because", "birthday"],
    styleTags: ["accessories", "elegant", "everyday", "feminine"],
    imageGradient: "from-plum/20 via-ivory to-champagne/30",
  },
  {
    id: "4",
    name: "Midnight Hoodie",
    slug: "midnight-hoodie",
    category: "Fashion",
    subcategory: "Hoodies",
    price: 32000,
    description:
      "Signature collection hoodie in deep midnight. Subtle logo on the front, distinctive artwork on the back. Soft heavyweight cotton with a relaxed fit designed for everyday comfort and quiet confidence.",
    shortDescription: "Signature hoodie with front logo and back artwork.",
    tag: "Signature",
    colors: ["Midnight", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isOriginal: true,
    isLimited: false,
    collection: "signature",
    occasionTags: ["birthday", "just because", "self care"],
    styleTags: ["hoodie", "casual", "street", "signature", "fashion"],
    imageGradient: "from-charcoal/20 via-ivory to-plum/15",
  },
  {
    id: "5",
    name: "Warm Ivory Bonnet",
    slug: "warm-ivory-bonnet",
    category: "Hair",
    subcategory: "Bonnets",
    price: 8500,
    description:
      "Satin-lined bonnet in warm ivory. Protects hair overnight while looking elegant enough for lounging. Soft elastic band that stays put without pressure.",
    shortDescription: "Satin-lined bonnet in warm ivory.",
    tag: null,
    colors: ["Ivory", "Champagne"],
    inStock: true,
    isOriginal: false,
    isLimited: false,
    occasionTags: ["self care", "thank you", "just because"],
    styleTags: ["hair", "self care", "everyday", "practical"],
    imageGradient: "from-ivory via-champagne/30 to-taupe/15",
  },
  {
    id: "6",
    name: "Sculpted Gold Hoops",
    slug: "sculpted-gold-hoops",
    category: "Accessories",
    subcategory: "Earrings",
    price: 11200,
    description:
      "Clean, sculpted gold-tone hoops with a modern silhouette. Lightweight and comfortable for all-day wear. The perfect finishing touch for any look.",
    shortDescription: "Modern sculpted gold-tone hoops.",
    tag: "New",
    colors: ["Gold"],
    inStock: true,
    isOriginal: false,
    isLimited: false,
    occasionTags: ["birthday", "anniversary", "thank you", "just because"],
    styleTags: ["earrings", "gold", "everyday", "elegant", "accessories"],
    imageGradient: "from-champagne/50 via-ivory to-champagne/20",
  },
  {
    id: "7",
    name: "Artwear Oversized Tee",
    slug: "artwear-oversized-tee",
    category: "Fashion",
    subcategory: "T-Shirts",
    price: 18500,
    description:
      "Oversized tee from the Artwear collection. Contemporary African illustration printed on premium cotton. Designed to be worn as a statement piece or layered under a blazer.",
    shortDescription: "Oversized tee with contemporary African illustration.",
    tag: "Artwear",
    colors: ["Ivory", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isOriginal: true,
    isLimited: false,
    collection: "artwear",
    occasionTags: ["birthday", "just because", "cultural"],
    styleTags: ["artwear", "african", "statement", "casual", "fashion"],
    imageGradient: "from-champagne/30 via-ivory to-plum/20",
  },
  {
    id: "8",
    name: "Perfume Oil – Dusk",
    slug: "perfume-oil-dusk",
    category: "Beauty",
    subcategory: "Fragrance",
    price: 14000,
    description:
      "A warm, intimate perfume oil. Notes of soft woods, amber and a quiet floral. Roll-on format for precise application. Long-lasting and skin-close — made for those who prefer scent that reveals itself slowly.",
    shortDescription: "Warm perfume oil with woods, amber and soft floral.",
    tag: "Curio Original",
    colors: ["Dusk"],
    inStock: true,
    isOriginal: true,
    isLimited: false,
    occasionTags: ["birthday", "anniversary", "thank you", "self care"],
    styleTags: ["fragrance", "beauty", "intimate", "everyday"],
    imageGradient: "from-plum/25 via-champagne/20 to-ivory",
  },
  {
    id: "9",
    name: "Neutral Expressions Set",
    slug: "neutral-expressions-set",
    category: "Beauty",
    subcategory: "Sets",
    price: 28500,
    compareAtPrice: 32000,
    description:
      "A curated set of three complementary pieces from the Colour Stories collection: Champagne Glow Lip Oil, a soft neutral liner, and a compact mirror. Designed to work together for an effortless everyday look.",
    shortDescription: "Curated three-piece neutral beauty set.",
    tag: "Curio Original",
    inStock: true,
    isOriginal: true,
    isLimited: false,
    collection: "colour-stories",
    occasionTags: ["birthday", "thank you", "self care", "just because"],
    styleTags: ["beauty", "set", "gift", "everyday"],
    imageGradient: "from-champagne/40 via-ivory to-taupe/20",
  },
  {
    id: "10",
    name: "Signature Crew Sweatshirt",
    slug: "signature-crew-sweatshirt",
    category: "Fashion",
    subcategory: "Sweatshirts",
    price: 29500,
    description:
      "Relaxed crew sweatshirt from the Signature collection. Soft brushed interior, clean exterior, and the distinctive back artwork that defines Curio originals. Made for cool evenings and quiet mornings.",
    shortDescription: "Relaxed Signature crew with distinctive back artwork.",
    tag: "Signature",
    colors: ["Ivory", "Plum", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isOriginal: true,
    isLimited: false,
    collection: "signature",
    occasionTags: ["birthday", "just because", "self care"],
    styleTags: ["sweatshirt", "casual", "signature", "fashion"],
    imageGradient: "from-ivory via-champagne/25 to-plum/10",
  },
  {
    id: "11",
    name: "Adire Midi Skirt",
    slug: "adire-midi-skirt",
    category: "Fashion",
    subcategory: "Skirts",
    price: 24500,
    description:
      "Midi skirt in classic Adire indigo and white. Elasticated waist, flowing silhouette, and side pockets. Easy to dress up or down — pair with a simple top or a structured blazer.",
    shortDescription: "Flowing midi skirt in classic Adire indigo.",
    tag: "Limited",
    colors: ["Indigo"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isOriginal: true,
    isLimited: true,
    collection: "adire",
    occasionTags: ["birthday", "special occasion", "cultural"],
    styleTags: ["adire", "skirt", "african", "statement", "fashion"],
    imageGradient: "from-plum/15 via-ivory to-charcoal/10",
  },
  {
    id: "12",
    name: "Pocket Mirror – Plum",
    slug: "pocket-mirror-plum",
    category: "Accessories",
    subcategory: "Mirrors",
    price: 6500,
    description:
      "Compact pocket mirror in deep plum with a soft-touch finish. Double-sided (normal + magnification). Small enough for any bag, substantial enough to feel considered.",
    shortDescription: "Compact double-sided pocket mirror in deep plum.",
    tag: null,
    colors: ["Plum"],
    inStock: true,
    isOriginal: false,
    isLimited: false,
    occasionTags: ["thank you", "just because", "self care"],
    styleTags: ["accessories", "practical", "everyday", "gift"],
    imageGradient: "from-plum/30 via-ivory to-champagne/20",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All" || !category) return products;
  if (category === "Originals") return products.filter((p) => p.isOriginal);
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function filterProductsForGift(params: {
  budgetMax?: number;
  occasion?: string;
  styleKeywords?: string[];
}): Product[] {
  let result = products.filter((p) => p.inStock);

  if (params.budgetMax) {
    result = result.filter((p) => p.price <= params.budgetMax!);
  }

  if (params.occasion) {
    const occ = params.occasion.toLowerCase();
    result = result.filter(
      (p) =>
        p.occasionTags?.some((t) => t.includes(occ) || occ.includes(t)) || true
    );
  }

  result = [...result].sort((a, b) => {
    if (a.isOriginal && !b.isOriginal) return -1;
    if (!a.isOriginal && b.isOriginal) return 1;
    return 0;
  });

  return result;
}
