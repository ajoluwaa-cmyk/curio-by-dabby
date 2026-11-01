export type ProductCategory =
  | "Beauty"
  | "Fashion"
  | "Accessories"
  | "Hair"
  | "Originals";

export type ProductTag =
  | "Curio Original"
  | "Limited"
  | "Signature"
  | "Artwear"
  | "New"
  | null;

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  price: number; // in Naira
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  tag: ProductTag;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  isOriginal: boolean;
  isLimited: boolean;
  collection?: "signature" | "artwear" | "colour-stories" | "adire";
  occasionTags?: string[];
  styleTags?: string[];
  imageGradient?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
