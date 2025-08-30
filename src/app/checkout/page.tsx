"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import {
  CreditCardIcon,
  Banknote,
  CheckCircleIcon,
  TruckIcon,
  MapPinIcon,
} from "lucide-react";

const Checkout: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    zipCode: "",
    phone: user?.phone || "",
    instructions: "",
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const deliveryFee = deliveryMethod === "delivery" ? 5.99 : 0;
  const tax = getTotalPrice() * 0.08; // 8% tax
  const finalTotal = getTotalPrice() + deliveryFee + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("delivery.")) {
      const field = name.split(".")[1];
      setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    } else if (name.startsWith("card.")) {
      const field = name.split(".")[1];
      setCardInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const orderNum = `BV${Date.now().toString().slice(-6)}`;
    setOrderNumber(orderNum);
    setIsProcessing(false);
    setIsCompleted(true);

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (!user) {
    navigate.replace("/auth");
    return null;
  }

  if (cartItems.length === 0 && !isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 flex items-center justify-center px-4">
        <FadeContent>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-300 mb-6">
              Add some delicious items to your cart first!
            </p>
            <button
              onClick={() => navigate.replace("/menu")}
              className="interactive bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </FadeContent>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 flex items-center justify-center px-4">
        {/* Success Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000" />
        </div>

        <FadeContent>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Order Confirmed! 🎉
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Thank you for your order! Your delicious meal is being prepared.
            </p>

            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-300 mb-2">
                Order Details
              </h3>
              <div className="text-gray-300 space-y-2">
                <p>
                  <strong>Order Number:</strong> #{orderNumber}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${finalTotal.toFixed(2)}
                </p>
                <p>
                  <strong>Delivery Method:</strong>{" "}
                  {deliveryMethod === "delivery" ? "Home Delivery" : "Pickup"}
                </p>
                <p>
                  <strong>Estimated Time:</strong>{" "}
                  {deliveryMethod === "delivery"
                    ? "35-45 minutes"
                    : "20-25 minutes"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate.replace("/menu")}
                className="interactive w-full bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors"
              >
                Order Again
              </button>
              <button
                onClick={() => navigate.replace("/")}
                className="interactive w-full bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
              >
                Back to Home
              </button>
            </div>
          </div>
        </FadeContent>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Checkout Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Checkout
        </SplitText> */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeContent direction="left">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-amber-400 font-semibold text-sm">
                        $
                        {(
                          parseFloat(item.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg border-t border-white/20 pt-2">
                    <span>Total:</span>
                    <span className="text-amber-400">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <FadeContent direction="right">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Delivery Method */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Delivery Method
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`interactive p-4 rounded-lg border-2 transition-all duration-300 ${
                        deliveryMethod === "delivery"
                          ? "border-amber-400 bg-amber-400/20"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <TruckIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Delivery</p>
                      <p className="text-gray-300 text-sm">35-45 min • $5.99</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`interactive p-4 rounded-lg border-2 transition-all duration-300 ${
                        deliveryMethod === "pickup"
                          ? "border-amber-400 bg-amber-400/20"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <MapPinIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Pickup</p>
                      <p className="text-gray-300 text-sm">20-25 min • Free</p>
                    </button>
                  </div>
                </div>

                {/* Delivery Information */}
                {deliveryMethod === "delivery" && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Delivery Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-white font-medium mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          name="delivery.address"
                          value={deliveryInfo.address}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="delivery.city"
                          value={deliveryInfo.city}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="delivery.zipCode"
                          value={deliveryInfo.zipCode}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="10001"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-white font-medium mb-2">
                          Delivery Instructions
                        </label>
                        <textarea
                          name="delivery.instructions"
                          value={deliveryInfo.instructions}
                          onChange={handleInputChange}
                          rows={3}
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                          placeholder="Any special delivery instructions..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`interactive p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === "card"
                          ? "border-amber-400 bg-amber-400/20"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <CreditCardIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Credit Card</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`interactive p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === "cash"
                          ? "border-amber-400 bg-amber-400/20"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <Banknote className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">
                        Cash on{" "}
                        {deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
                      </p>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-white font-medium mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="card.number"
                          value={cardInfo.number}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="card.expiry"
                          value={cardInfo.expiry}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="card.cvv"
                          value={cardInfo.cvv}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="123"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-white font-medium mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="card.name"
                          value={cardInfo.name}
                          onChange={handleInputChange}
                          required
                          className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-6 h-6" />
                      Place Order • ${finalTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </FadeContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
