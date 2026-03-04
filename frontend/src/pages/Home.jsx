import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import { mockProducts as products } from "../data/products";

const categories = [
  { name: "Vegetable Seeds", img: "https://images.unsplash.com/photo-1592928303262-02f6a4b43b6f" },
  { name: "Fruits", img: "https://images.unsplash.com/photo-1574226516831-e1dff420e42e" },
  { name: "Leafy Greens", img: "https://images.unsplash.com/photo-1604908177522-4020dcd9c7f7" },
  { name: "Grains", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { name: "Fertilizers", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449" },
  { name: "Tools", img: "https://images.unsplash.com/photo-1598514982846-9a9f8c74b2f6" },
];

function Home() {
  return (
    <div className="bg-gradient-to-b from-luxury-cream via-[#F0F7F2] to-[#FAFDF8]">
      {/* HERO SECTION */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden" 
               style={{backgroundImage: 'url("https://images.unsplash.com/photo-1500595046743-cd271d694d30")'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
        <div className="relative text-center text-white max-w-3xl px-6 z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6 leading-tight">Farm Fresh Perfection</h1>
          <p className="text-xl md:text-2xl mb-10 font-light opacity-95">Direct from Nepal's finest farmers to your table. Premium quality, fair prices, sustainable farming.</p>
          <Link 
            to="/products" 
            className="inline-block bg-gradient-to-r from-luxury-gold to-[#D4AF37] text-[#1B3D2F] px-10 py-4 rounded-full font-serif font-bold text-lg hover:shadow-luxury-lg transition-all duration-300 shadow-luxury"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif font-bold text-center text-[#1B3D2F] mb-4">Shop by Category</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Curated selections across all agriculture categories</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer border border-luxury-gold/10"
            >
              <div className="relative overflow-hidden h-40">
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <p className="p-4 text-center font-semibold text-[#1B3D2F]">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif font-bold text-center text-[#1B3D2F] mb-4">Featured Products</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Hand-picked finest selections from verified farmers</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* LUXURY CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1B3D2F] to-[#2F6F4F] text-white rounded-3xl mx-6 mb-12 shadow-luxury-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Join the Farm-to-Table Revolution</h2>
          <p className="text-lg opacity-90 mb-8">Support local farmers. Get premium produce. Build a sustainable future.</p>
          <Link 
            to="/products"
            className="inline-block bg-luxury-gold text-[#1B3D2F] px-10 py-4 rounded-full font-serif font-bold hover:shadow-luxury transition-all duration-300"
          >
            Discover More
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;