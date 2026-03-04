import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [invoiceIndex, setInvoiceIndex] = useState(null); // which order's invoice is shown

  useEffect(() => {
    const stored = localStorage.getItem("krishiconnect_orders");
    setOrders(stored ? JSON.parse(stored) : []);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl text-gray-600 font-serif">You have not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-serif font-bold text-[#1B3D2F] mb-12">Your Orders</h1>
        <ul className="space-y-6">
          {orders.map((o, idx) => (
            <li
              key={idx}
              className="bg-white rounded-2xl shadow-luxury p-6 border border-luxury-gold/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-serif font-bold text-[#1B3D2F] text-lg">
                    Order #{idx + 1}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(o.date).toLocaleString()}
                  </p>
                </div>
                <span
                  className={
                    o.status === "Paid"
                      ? "bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm"
                      : "bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm"
                  }
                >
                  {o.status}
                </span>
              </div>
              
              {o.wallet && (
                <p className="text-sm text-gray-600 mb-4">
                  💳 Paid via <strong>{o.wallet}</strong>
                </p>
              )}

              <div className="bg-luxury-cream rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  {o.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-semibold">
                        {item.quantity}x • Rs. {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-serif font-bold text-[#1B3D2F]">Subtotal</p>
                <p className="text-2xl font-bold text-luxury-gold">Rs. {o.total}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setInvoiceIndex(invoiceIndex === idx ? null : idx)
                  }
                  className="text-luxury-gold hover:text-[#D4AF37] font-semibold transition-colors"
                >
                  {invoiceIndex === idx ? "Hide Invoice" : "📄 View Invoice"}
                </button>
              </div>

              {invoiceIndex === idx && (
                <div className="mt-6 pt-6 border-t border-luxury-gold/20">
                  <div className="bg-white rounded-lg p-6 border border-luxury-gold/20">
                    <h3 className="text-xl font-serif font-bold text-[#1B3D2F] mb-4">Invoice</h3>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p>
                        <strong>Invoice #:</strong> INV-{idx + 1}-{new Date(o.date).getTime()}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(o.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-luxury-cream rounded p-4 mb-4">
                      {o.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm mb-2 last:mb-0"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-semibold">Rs. {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center border-t border-luxury-gold/20 pt-4">
                      <p className="font-serif font-bold text-[#1B3D2F]">Total</p>
                      <p className="text-lg font-bold text-luxury-gold">Rs. {o.total}</p>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
