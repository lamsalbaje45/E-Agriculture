import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { submitEsewaPayment } from "../utils/esewa";

const statuses = ["pending", "processing", "shipped", "completed", "cancelled"];

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const response = await api.get("/orders");
    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, {
      status,
      paymentStatus: status === "completed" ? "paid" : "pending",
    });
    loadOrders();
  };

  const initiatePayment = async (order, provider) => {
    const response = await api.post("/payments/initiate", {
      provider,
      orderId: order.id,
      amount: order.total_price,
    });
    submitEsewaPayment(response.data.esewa);
  };

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div key={order.id} className="glass rounded-[2rem] p-6 shadow-panel">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h2 className="break-words text-xl font-semibold text-bark sm:text-2xl">
                {order.product_name || `Order #${order.id}`}
              </h2>
              <p className="mt-1 break-words text-bark/70">
                Quantity: {order.quantity} | Total: Rs. {order.total_price} | Payment: {order.payment_method}
              </p>
              <p className="mt-1 break-words text-sm text-bark/60">
                Status: {order.order_status} | Payment status: {order.payment_status}
              </p>
            </div>
            {(user.role === "farmer" || user.role === "admin") && (
              <select
                className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3 lg:w-auto"
                value={order.order_status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            )}
            {user.role === "buyer" && order.payment_status === "pending" && order.payment_method !== "cod" && (
              <div className="flex flex-wrap gap-2">
                <button
                  className="w-full rounded-2xl bg-moss px-4 py-3 font-semibold text-white sm:w-auto"
                  onClick={() => initiatePayment(order, "esewa")}
                >
                  Pay with eSewa
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
