export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string | null;
  price: number;
  compare_at_price: number | null;
  description: string;
  short_description: string;
  tag: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  in_stock: boolean;
  is_original: boolean;
  is_limited: boolean;
  collection: string | null;
  occasion_tags: string[] | null;
  style_tags: string[] | null;
  image_urls: string[] | null;
  image_gradient: string | null;
  is_visible: boolean;
  stock_quantity: number | null;
  created_at: string;
  updated_at: string;
};

export type OrderRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status: "unpaid" | "paid" | "failed" | "refunded";
  customer_full_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_note: string | null;
  gift_note: string | null;
  subtotal: number;
  internal_notes: string | null;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  price: number;
  quantity: number;
  selected_color: string | null;
  selected_size: string | null;
};

export type CustomerRow = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
