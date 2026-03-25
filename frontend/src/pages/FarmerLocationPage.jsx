import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import FarmerLocationMap from "../components/FarmerLocationMap";

export default function FarmerLocationPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/products");
  };

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        const response = await api.get(`/products/${productId}`);
        if (isMounted) {
          setProduct(response.data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return <p className="text-bark/70">Loading farmer location...</p>;
  }

  if (!product) {
    return <p className="text-bark/70">Unable to load product details.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <button
        className="w-full rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-bark sm:w-auto"
        onClick={goBack}
      >
        Back to products
      </button>

      <section className="glass rounded-[2rem] p-6 shadow-panel md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-moss">Farmer location</p>
        <h1 className="mt-2 break-words font-display text-3xl text-bark sm:text-4xl">{product.farmer_name}</h1>
        <p className="mt-2 break-words text-bark/75">Product: {product.name}</p>
        <p className="mt-1 text-bark/70">{product.farmer_address || "Address not provided"}</p>

        {product.farmer_latitude !== null && product.farmer_longitude !== null ? (
          <div className="mt-5 space-y-3">
            <FarmerLocationMap
              latitude={product.farmer_latitude}
              longitude={product.farmer_longitude}
              farmerName={product.farmer_name}
              address={product.farmer_address}
            />
            <a
              className="inline-block w-full rounded-2xl bg-bark px-4 py-2.5 text-center text-sm font-semibold text-sand sm:w-auto"
              href={`https://www.google.com/maps/dir/?api=1&destination=${product.farmer_latitude},${product.farmer_longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              Open directions
            </a>
          </div>
        ) : (
          <p className="mt-5 text-bark/65">Farmer has not added map location yet.</p>
        )}
      </section>
    </div>
  );
}
