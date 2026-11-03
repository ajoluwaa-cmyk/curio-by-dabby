export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
}

export interface OrderShipping {
  address: string;
  city: string;
  state: string;
  country: string;
  note?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderItem[];
  subtotal: number;
  giftNote?: string;
  paymentStatus: "unpaid" | "paid" | "failed";
}

export interface CreateOrderPayload {
  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderItem[];
  subtotal: number;
  giftNote?: string;
}
