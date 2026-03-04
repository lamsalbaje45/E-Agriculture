import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // send cart info to the payment page where the wallet integration
    // will take place. the order is recorded after a successful payment.
    navigate("/payment", { state: { cart, total } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl text-gray-600 font-serif">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-serif font-bold text-[#1B3D2F] mb-12">Order Summary</h1>
        <div className="bg-white rounded-2xl shadow-luxury p-8 mb-8">
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-4 border-b border-luxury-gold/20 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-[#1B3D2F]">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-lg font-bold text-luxury-gold">Rs. {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-luxury-gold/30 pt-6">
            <div className="flex justify-between items-center mb-8">
              <p className="text-2xl font-serif font-bold text-[#1B3D2F]">Total Amount:</p>
              <p className="text-3xl font-bold text-luxury-gold">Rs. {total}</p>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-luxury-gold to-[#D4AF37] text-[#1B3D2F] px-8 py-4 rounded-lg hover:shadow-luxury transition-all duration-300 font-serif font-bold text-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
