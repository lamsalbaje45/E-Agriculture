import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// simple mock page where user "pays" with a Nepali digital wallet
export default function Payment() {
  const { clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // state is passed from checkout
  const { cart, total } = location.state || {};

  useEffect(() => {
    // if someone landed here without a cart, send them back
    if (!cart || cart.length === 0) {
      navigate("/checkout");
    }
  }, [cart, navigate]);

  const [wallet, setWallet] = useState("");

  const handlePaymentConfirmation = () => {
    if (!wallet) return;

    // simulate a successful wallet charge and save order
    const existing = JSON.parse(
      localStorage.getItem("krishiconnect_orders") || "[]"
    );
    const newOrder = {
      items: cart,
      total,
      date: new Date(),
      status: "Paid",
      wallet,
    };

    localStorage.setItem(
      "krishiconnect_orders",
      JSON.stringify([...existing, newOrder])
    );

    clearCart();
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-5xl font-serif font-bold text-[#1B3D2F] mb-4">Secure Payment</h1>
        <p className="text-gray-600 mb-12">Choose your preferred payment method</p>

        <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-2">Total Amount</p>
            <p className="text-4xl font-serif font-bold text-luxury-gold">Rs. {total}</p>
          </div>

          {/* placeholder buttons for Nepali wallets */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => setWallet("eSewa")}
              className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                wallet === "eSewa" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-luxury" 
                  : "bg-blue-50 text-blue-600 border-2 border-blue-200 hover:border-blue-400"
              }`}
            >
              <span className="text-2xl">💳</span> Pay with eSewa
            </button>
            <button
              onClick={() => setWallet("Khalti")}
              className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                wallet === "Khalti" 
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-luxury" 
                  : "bg-purple-50 text-purple-600 border-2 border-purple-200 hover:border-purple-400"
              }`}
            >
              <span className="text-2xl">💰</span> Pay with Khalti
            </button>
          </div>

          <button
            onClick={handlePaymentConfirmation}
            disabled={!wallet}
            className={`w-full px-8 py-4 rounded-lg font-serif font-bold text-lg transition-all duration-300 ${
              wallet
                ? "bg-gradient-to-r from-luxury-gold to-[#D4AF37] text-[#1B3D2F] hover:shadow-luxury"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {wallet ? `Confirm Payment via ${wallet}` : "Select a Payment Method"}
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center bg-amber-50 border border-amber-200 rounded-lg p-4">
          <span className="font-semibold">🔒 Secure Payment:</span> Your payment information is encrypted and secure. This is a demo payment flow.
        </p>
      </div>
    </div>
  );
}
