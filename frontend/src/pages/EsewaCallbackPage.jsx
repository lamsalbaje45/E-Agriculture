import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function EsewaCallbackPage({ isSuccess }) {
  const navigate = useNavigate();
  const query = useQuery();
  const [status, setStatus] = useState(isSuccess ? "Verifying payment..." : "Payment not completed.");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const payload = query.get("data");
    if (!payload) {
      setError("Missing payment response from eSewa.");
      setStatus("Verification failed.");
      return;
    }

    api
      .post("/payments/esewa/verify", { data: payload })
      .then((response) => {
        if (response.data.paymentStatus === "paid") {
          setStatus("Payment completed successfully.");
          return;
        }

        setError("Payment could not be confirmed.");
        setStatus("Verification failed.");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to verify your payment right now.");
        setStatus("Verification failed.");
      });
  }, [isSuccess, query]);

  const successful = isSuccess && status === "Payment completed successfully.";

  return (
    <div className="mx-auto max-w-2xl glass rounded-[2rem] p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.3em] text-moss">eSewa payment</p>
      <h1 className="mt-3 text-3xl font-semibold text-bark">{successful ? "Payment successful" : "Payment update"}</h1>
      <p className="mt-4 text-bark/70">{status}</p>
      {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-2xl bg-moss px-5 py-3 font-semibold text-white"
          onClick={() => navigate("/orders")}
        >
          Go to orders
        </button>
        <Link to="/products" className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-bark">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
