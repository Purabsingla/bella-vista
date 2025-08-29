"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { X, MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";

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

  const handleCheckout = () => {
    if (!user) {
      router.replace("/auth?from=/menu"); // attach "from" in query
      setIsCartOpen(false);
      return;
    }

    // Simulate checkout process
    alert("Order placed successfully! 🎉");
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden transition">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-lg border-l border-white/20 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <ShoppingBagIcon className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
              {cartItems.length > 0 && (
                <span className="bg-amber-600 text-white text-sm px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="interactive text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBagIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm">
                  Add some delicious items to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-amber-400 font-bold">
                            {item.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="interactive w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="text-white font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="interactive w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="interactive text-gray-400 hover:text-red-400 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/20 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-amber-400 font-bold text-xl">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {user ? "🛒 Checkout" : "🔐 Login to Checkout"}
                </button>

                <button
                  onClick={clearCart}
                  className="interactive w-full bg-white/10 text-white py-2 rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20"
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
