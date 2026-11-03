"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  giftNote: string;
  addItem: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  removeItem: (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  setGiftNote: (note: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function itemKey(id: string, color?: string, size?: string) {
  return `${id}-${color || ""}-${size || ""}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      giftNote: "",

      addItem: (product, quantity = 1, selectedColor, selectedSize) => {
        set((state) => {
          const key = itemKey(product.id, selectedColor, selectedSize);
          const existing = state.items.find(
            (i) =>
              itemKey(i.product.id, i.selectedColor, i.selectedSize) === key
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.product.id, i.selectedColor, i.selectedSize) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedColor, selectedSize },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, selectedColor, selectedSize) => {
        const key = itemKey(productId, selectedColor, selectedSize);
        set((state) => ({
          items: state.items.filter(
            (i) =>
              itemKey(i.product.id, i.selectedColor, i.selectedSize) !== key
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedColor, selectedSize) => {
        if (quantity < 1) {
          get().removeItem(productId, selectedColor, selectedSize);
          return;
        }
        const key = itemKey(productId, selectedColor, selectedSize);
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.product.id, i.selectedColor, i.selectedSize) === key
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], giftNote: "" }),

      setGiftNote: (note) => set({ giftNote: note }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "curio-cart",
      partialize: (state) => ({
        items: state.items,
        giftNote: state.giftNote,
      }),
    }
  )
);
