"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    giftNote,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-charcoal/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="fixed top-0 right-0 z-[90] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-taupe/15 px-6 py-5">
          <div>
            <h3 className="text-lg font-medium text-plum">Your Cart</h3>
            <p className="text-xs text-taupe">
              {items.length === 0
                ? "Empty"
                : `${items.reduce((s, i) => s + i.quantity, 0)} item${
                    items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"
                  }`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-charcoal transition hover:bg-taupe/10"
            aria-label="Close cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="mb-2 text-sm text-taupe">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-sm font-medium text-plum underline-offset-4 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4"
                >
                  <div
                    className={`h-24 w-20 flex-shrink-0 rounded-xl bg-gradient-to-br ${
                      item.product.imageGradient ||
                      "from-champagne/30 via-ivory to-plum/10"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${item.product.id}`}
                      onClick={closeCart}
                      className="block truncate text-sm font-medium text-charcoal hover:text-plum"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-taupe">
                      {item.selectedColor && `${item.selectedColor}`}
                      {item.selectedColor && item.selectedSize && " · "}
                      {item.selectedSize && `${item.selectedSize}`}
                    </p>
                    <p className="mt-1 text-sm text-charcoal">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-taupe/25">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-3 py-1 text-sm text-charcoal hover:text-plum"
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-3 py-1 text-sm text-charcoal hover:text-plum"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-xs text-taupe hover:text-plum"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {giftNote && (
                <div className="rounded-xl border border-plum/15 bg-plum/5 p-3">
                  <p className="text-[11px] font-medium text-charcoal">
                    Gift note
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-taupe">
                    {giftNote}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-taupe/15 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-taupe">Subtotal</span>
              <span className="text-base font-medium text-charcoal">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-plum py-3.5 text-center text-sm font-medium text-ivory transition hover:bg-plum/90"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="mt-3 w-full text-center text-sm text-taupe hover:text-plum"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
