"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Cart: React.FC = () => {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (!user) {
      router.push("/auth?from=/menu");
      setIsCartOpen(false);
      return;
    }
    router.push("/checkout");
    setIsCartOpen(false);
  };

  if (!visible && !isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* 1. Backdrop (Dark & Blurry) */}
      <div
        className={`absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* 2. Slide-Over Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
          animate ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-stone-950/50 backdrop-blur-md">
          {/* --- Header --- */}
          <div className="flex items-center justify-between p-6 border-b border-stone-800">
            <div className="flex items-baseline gap-3">
              <h2 className={`${playfair.className} text-2xl text-white`}>
                Your Order
              </h2>
              <span
                className={`${manrope.className} text-stone-500 text-xs uppercase tracking-widest font-bold`}
              >
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* --- Cart Items --- */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center border border-stone-800">
                  <ShoppingBag className="w-8 h-8 text-stone-600" />
                </div>
                <div>
                  <p
                    className={`${playfair.className} text-xl text-white mb-2`}
                  >
                    Your cart is empty
                  </p>
                  <p className={`${manrope.className} text-stone-500 text-sm`}>
                    Looks like you haven&apos;t added anything yet.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className={`${manrope.className} text-amber-500 text-xs font-bold uppercase tracking-widest border-b border-amber-500/30 hover:border-amber-500 pb-1 transition-all`}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 bg-stone-900/40 p-3 rounded-sm border border-transparent hover:border-stone-800 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-sm bg-stone-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3
                            className={`${playfair.className} text-lg text-white leading-tight pr-4`}
                          >
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p
                          className={`${manrope.className} text-stone-500 text-xs line-clamp-1 mt-1 font-light`}
                        >
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span
                          className={`${manrope.className} text-amber-500 font-bold text-sm`}
                        >
                          {item.price}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 rounded-sm px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-stone-400 hover:text-white transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            className={`${manrope.className} text-white text-xs font-bold w-4 text-center`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-stone-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Footer --- */}
          {cartItems.length > 0 && (
            <div className="bg-stone-900 border-t border-stone-800 p-6 space-y-6">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-sm">
                  <span className={manrope.className}>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white text-lg font-bold">
                  <span className={playfair.className}>Total</span>
                  <span className="text-amber-500">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="group relative w-full bg-white text-stone-950 hover:bg-amber-500 hover:text-white transition-all duration-300 py-4 overflow-hidden rounded-sm"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span
                      className={`${manrope.className} text-xs font-bold uppercase tracking-widest`}
                    >
                      {user ? "Proceed to Checkout" : "Login to Checkout"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={clearCart}
                  className={`${manrope.className} w-full text-center text-stone-500 hover:text-red-500 text-xs uppercase tracking-widest font-bold transition-colors py-2`}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
