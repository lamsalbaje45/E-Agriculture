import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  id: null,
  name: "",
  description: "",
  productType: "Vegetable",
  price: "",
  quantity: "",
  unit: "kg",
  region: "",
  imageUrl: "",
};

export default function ProductsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ region: "", type: "", search: "" });
  const [form, setForm] = useState(initialForm);
  const [buyerLocation, setBuyerLocation] = useState(null);

  const loadProducts = async () => {
    const response = await api.get("/products", { params: filters });
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user.role !== "buyer" || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBuyerLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setBuyerLocation(null);
      }
    );
  }, [user.role]);

  const getDistanceKm = (farmerLatitude, farmerLongitude) => {
    if (!buyerLocation) {
      return null;
    }

    const toRadians = (value) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const farmerLat = Number(farmerLatitude);
    const farmerLng = Number(farmerLongitude);

    if (Number.isNaN(farmerLat) || Number.isNaN(farmerLng)) {
      return null;
    }

    const latDelta = toRadians(farmerLat - buyerLocation.latitude);
    const lngDelta = toRadians(farmerLng - buyerLocation.longitude);
    const a =
      Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
      Math.cos(toRadians(buyerLocation.latitude)) *
        Math.cos(toRadians(farmerLat)) *
        Math.sin(lngDelta / 2) *
        Math.sin(lngDelta / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    if (form.id) {
      await api.put(`/products/${form.id}`, form);
    } else {
      await api.post("/products", form);
    }
    setForm(initialForm);
    loadProducts();
  };

  const startEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description || "",
      productType: product.product_type,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      region: product.region,
      imageUrl: product.image_url || "",
    });

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const deleteProduct = async (productId) => {
    await api.delete(`/products/${productId}`);
    if (form.id === productId) {
      setForm(initialForm);
    }
    loadProducts();
  };

  const messageFarmer = async (product) => {
    await api.post("/chat", {
      receiverId: product.farmer_id,
      message: `Hello, I am interested in your product: ${product.name}.`,
    });
    navigate("/chat", {
      state: {
        contactId: Number(product.farmer_id),
        contactName: product.farmer_name,
      },
    });
  };

  const cardThemes = [
    {
      shell: "from-[#f8fff2] via-white to-[#f5fbef]",
      chip: "bg-[#e4f2d1] text-[#335127]",
    },
    {
      shell: "from-[#fffaf2] via-white to-[#fff4e6]",
      chip: "bg-[#ffe7c2] text-[#6b3f0b]",
    },
    {
      shell: "from-[#f2fbff] via-white to-[#ecf8ff]",
      chip: "bg-[#d7efff] text-[#0f4463]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-[2rem] p-4 shadow-panel sm:p-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Marketplace catalog</p>
            <h1 className="mt-2 font-display text-3xl text-bark sm:text-4xl">Browse fresh farm products</h1>
          </div>
          <div className="rounded-full bg-leaf/20 px-4 py-2 text-sm font-semibold text-bark">
            {products.length} products found
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-2.5" placeholder="Search" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-2.5" placeholder="Region" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-2.5" placeholder="Type" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} />
          <button className="rounded-2xl bg-moss px-4 py-2.5 font-semibold text-white" onClick={loadProducts}>Apply filters</button>
        </div>
      </div>

      {(user.role === "farmer" || user.role === "admin") && (
        <form ref={formRef} className="glass grid gap-4 rounded-[2rem] p-4 shadow-panel sm:p-6 md:grid-cols-2" onSubmit={submitProduct}>
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Type" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3" placeholder="Region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
          <input className="rounded-2xl border border-bark/10 bg-white px-4 py-3 md:col-span-2" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <textarea className="rounded-2xl border border-bark/10 bg-white px-4 py-3 md:col-span-2" rows="4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
            <button className="w-full rounded-2xl bg-moss px-4 py-3 font-semibold text-white sm:w-auto">
              {form.id ? "Update product" : "Add product"}
            </button>
            {form.id && (
              <button
                type="button"
                className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-bark sm:w-auto"
                onClick={() => setForm(initialForm)}
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => {
          const theme = cardThemes[index % cardThemes.length];
          const productImage =
            product.image_url ||
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

          return (
            <article
              key={product.id}
              className={`overflow-hidden rounded-[1.9rem] border border-white/75 bg-gradient-to-br ${theme.shell} shadow-[0_24px_60px_rgba(49,68,35,0.12)] transition duration-300 hover:-translate-y-1`}
            >
              <div className="relative">
                <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${productImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${theme.chip}`}>
                    {product.product_type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="line-clamp-2 text-2xl font-semibold text-white">{product.name}</h2>
                  <p className="mt-1 text-sm font-medium text-white/90">{product.farmer_region || product.region || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="line-clamp-2 min-h-[3rem] text-sm leading-6 text-bark/78">
                  {product.description || "Fresh produce directly from the farmer with transparent stock and quick communication."}
                </p>

                <div className="rounded-[1.35rem] border border-moss/10 bg-gradient-to-r from-[#f3faea] via-white to-[#eef8e4] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss/80">Price</p>
                  <div className="mt-2 flex items-end gap-2">
                    <p className="text-2xl font-bold leading-none text-bark">Rs. {product.price}</p>
                    <p className="text-xs text-bark/45">per {product.unit}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-bark/10 bg-white/85 px-4 py-3">
                  <p className="text-sm font-semibold text-bark">{product.farmer_name}</p>
                  <p className="mt-1 text-sm text-bark/70">
                    Available: {product.quantity} {product.unit}
                  </p>
                  {user.role === "buyer" && product.farmer_latitude !== null && product.farmer_longitude !== null && buyerLocation && (
                    <p className="mt-1 text-sm font-semibold text-moss">
                      {getDistanceKm(product.farmer_latitude, product.farmer_longitude)?.toFixed(1)} km away
                    </p>
                  )}
                  {user.role === "buyer" && (product.farmer_latitude === null || product.farmer_longitude === null) && (
                    <p className="mt-1 text-sm text-bark/60">Farmer has not added map location yet.</p>
                  )}
                </div>

                {(user.role === "admin" || (user.role === "farmer" && Number(product.farmer_id) === Number(user.id))) && (
                  <div className="flex gap-2">
                    <button className="rounded-2xl bg-moss px-4 py-2.5 text-sm font-semibold text-white" onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button className="rounded-2xl bg-bark px-4 py-2.5 text-sm font-semibold text-sand" onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                )}

                {user.role === "buyer" && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      className="rounded-2xl bg-moss px-4 py-2.5 text-sm font-semibold text-white"
                      onClick={() => navigate(`/checkout/${product.id}`)}
                    >
                      Order now
                    </button>
                    <button
                      className="rounded-2xl bg-moss px-4 py-2.5 text-sm font-semibold text-white"
                      onClick={() => messageFarmer(product)}
                    >
                      Message farmer
                    </button>
                    {product.farmer_latitude !== null && product.farmer_longitude !== null && (
                      <button
                        className="sm:col-span-2 rounded-2xl bg-[#1A73E8] px-4 py-2.5 text-sm font-semibold text-white"
                        onClick={() => navigate(`/products/${product.id}/location`)}
                      >
                        See farmer location
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
