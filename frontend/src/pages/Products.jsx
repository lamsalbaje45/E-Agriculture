import { mockProducts as products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-[#1B3D2F] mb-3">Premium Collection</h1>
          <p className="text-lg text-gray-600">Explore our curated selection of farm-fresh produce from certified farmers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}