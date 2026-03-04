import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useCart } from "../context/CartContext";
import Reviews from "../components/Reviews";
import { mockProducts } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 bg-white rounded-2xl shadow-luxury p-8">
          <div className="rounded-xl overflow-hidden shadow-luxury">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-serif font-bold text-[#1B3D2F] mb-4">{product.name}</h1>
            <p className="text-luxury-gold font-bold text-4xl mb-6">
              Rs. {product.price}/kg
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">{product.description}</p>
            <div className="text-sm text-gray-600 mb-6">
              <p><strong>📍 Location:</strong> {product.location}</p>
              <p><strong>✨ Quality:</strong> Premium Farm Fresh</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-luxury-gold to-[#D4AF37] text-[#1B3D2F] px-8 py-4 rounded-lg hover:shadow-luxury transition-all duration-300 font-serif font-bold text-lg w-fit"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <Reviews productId={product.id} />
      </div>
    </div>
  );
}
