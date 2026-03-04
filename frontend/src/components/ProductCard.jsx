import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-serif font-bold text-[#1B3D2F] mb-1">{product.name}</h3>
        <p className="text-luxury-gold font-bold text-lg mb-1">Rs. {product.price}/kg</p>
        <p className="text-sm text-gray-500 mb-4">{product.location}</p>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gradient-to-r from-[#2F6F4F] to-[#4C9A6A] text-white text-center py-2 rounded-lg hover:shadow-luxury transition-all duration-300 font-semibold"
          >
            Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-luxury-gold text-[#1B3D2F] py-2 rounded-lg hover:shadow-luxury transition-all duration-300 font-semibold"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
