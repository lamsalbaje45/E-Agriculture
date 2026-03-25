import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { submitEsewaPayment } from "../utils/esewa";

export default function OrderCheckoutPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((err) => setError(err.response?.data?.message || "Unable to load product."))
      .finally(() => setLoading(false));
  }, [productId]);

  const total = useMemo(() => {
    if (!product) {
      return 0;
    }

    return Number(product.price) * Number(quantity || 0);
  }, [product, quantity]);

  const submitOrder = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await api.post("/orders", {
        productId: product.id,
        quantity: Number(quantity),
        paymentMethod,
      });

      if (paymentMethod === "esewa") {
        const paymentResponse = await api.post("/payments/initiate", {
          provider: "esewa",
          orderId: response.data.id,
          amount: response.data.total_price,
        });

        submitEsewaPayment(paymentResponse.data.esewa);
        return;
      }

      setPlacedOrder(response.data);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Unable to place your order right now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="glass rounded-[2rem] p-8 shadow-panel text-bark">Loading checkout...</div>;
  }

  if (error || !product) {
    return (
      <div className="glass rounded-[2rem] p-8 shadow-panel">
        <p className="text-red-600">{error || "Product not found."}</p>
        <Link to="/products" className="mt-4 inline-block rounded-2xl bg-bark px-4 py-3 font-semibold text-sand">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,420px]">
      <section className="glass rounded-[2rem] p-6 shadow-panel sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-moss">Order checkout</p>
        <h1 className="mt-3 break-words font-display text-4xl text-bark sm:text-5xl">{product.name}</h1>
        <p className="mt-4 text-bark/70">{product.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-bark/55">Category</p>
            <p className="mt-2 text-xl font-semibold text-bark">{product.product_type}</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-bark/55">Region</p>
            <p className="mt-2 text-xl font-semibold text-bark">{product.farmer_region || product.region || "N/A"}</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-bark/55">Farmer</p>
            <p className="mt-2 text-xl font-semibold text-bark">{product.farmer_name}</p>
          </div>
          <div className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-bark/55">Available stock</p>
            <p className="mt-2 text-xl font-semibold text-bark">
              {product.quantity} {product.unit}
            </p>
          </div>
        </div>
      </section>

      <form className="glass rounded-[2rem] p-6 shadow-panel sm:p-8" onSubmit={submitOrder}>
        {placedOrder ? (
          <div className="relative overflow-hidden rounded-[1.75rem] border border-moss/15 bg-gradient-to-br from-[#f7fff1] via-white to-[#eef8e7] p-6">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-leaf/20 blur-2xl" />
            <div className="absolute -bottom-8 left-6 h-24 w-24 rounded-full bg-moss/10 blur-2xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss text-3xl text-white shadow-lg shadow-moss/25">
                ✓
              </div>

              <p className="mt-5 text-sm uppercase tracking-[0.3em] text-moss">Order confirmed</p>
              <h2 className="mt-3 text-3xl font-semibold text-bark">Your order is in the queue</h2>
              <p className="mt-3 text-bark/70">
                {product.name} has been requested successfully. You can review the order status now or continue browsing more farm products.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-bark/55">Quantity</p>
                  <p className="mt-2 text-lg font-semibold text-bark">
                    {quantity} {product.unit}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-bark/55">Payment</p>
                  <p className="mt-2 text-lg font-semibold text-bark">
                    {paymentMethod === "esewa" ? "eSewa" : "Cash on delivery"}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-bark/55">Total</p>
                  <p className="mt-2 text-lg font-semibold text-bark">Rs. {total.toFixed(2)}</p>
                </div>
                <div className="rounded-3xl bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-bark/55">Order reference</p>
                  <p className="mt-2 text-lg font-semibold text-bark">
                    #{placedOrder?.order?.id || placedOrder?.id || "Created"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-moss px-5 py-3 font-semibold text-white sm:w-auto"
                  onClick={() => navigate("/orders")}
                >
                  Track this order
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-white px-5 py-3 font-semibold text-bark sm:w-auto"
                  onClick={() => navigate("/products")}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-bark">Complete your order</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-bark/70">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3 text-bark outline-none"
                />
                <p className="mt-2 text-sm text-bark/60">Unit: {product.unit}</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-bark/70">Payment type</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-2xl border border-bark/10 bg-white px-4 py-3 text-bark outline-none"
                >
                  <option value="esewa">eSewa</option>
                  <option value="cod">Cash on delivery</option>
                </select>
              </div>

              <div className="rounded-3xl bg-leaf/15 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-bark/55">Total payable</p>
                <p className="mt-2 text-3xl font-bold text-bark">Rs. {total.toFixed(2)}</p>
                <p className="mt-2 text-sm text-bark/60">
                  {paymentMethod === "esewa"
                    ? "You will be redirected to eSewa after placing the order."
                    : "Cash on delivery requires no online payment."}
                </p>
              </div>

              {submitError && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submitError}</p>}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="w-full rounded-2xl bg-moss px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                disabled={submitting}
              >
                {submitting ? "Processing..." : paymentMethod === "esewa" ? "Place order & pay with eSewa" : "Place order"}
              </button>
              <Link to="/products" className="w-full rounded-2xl bg-white px-5 py-3 text-center font-semibold text-bark sm:w-auto">
                Cancel
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
