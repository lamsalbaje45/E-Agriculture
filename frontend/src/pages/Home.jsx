import { Link } from "react-router-dom";

const categories = [
  { name: "Vegetable Seeds", img: "https://images.unsplash.com/photo-1592928303262-02f6a4b43b6f" },
  { name: "Fruits", img: "https://images.unsplash.com/photo-1574226516831-e1dff420e42e" },
  { name: "Leafy Greens", img: "https://images.unsplash.com/photo-1604908177522-4020dcd9c7f7" },
  { name: "Grains", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { name: "Fertilizers", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449" },
  { name: "Tools", img: "https://images.unsplash.com/photo-1598514982846-9a9f8c74b2f6" },
];

const products = [
  { name: "Fresh Tomatoes", price: 80, img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337" },
  { name: "Organic Potatoes", price: 60, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655" },
  { name: "Spinach", price: 50, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb" },
  { name: "Cauliflower", price: 70, img: "https://images.unsplash.com/photo-1615486362658-62c5fbe48b7e" },
  { name: "Cabbage", price: 55, img: "https://images.unsplash.com/photo-1603048297172-c92544798d5a" },
  { name: "Carrot", price: 65, img: "https://images.unsplash.com/photo-1582515073490-39981397c445" },
];

function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Buy Fresh Vegetables Directly From Farmers</h1>
          <p>KrishiConnect connects local farmers with consumers across Nepal.</p>
          <Link to="/products" className="hero-btn">Shop Now</Link>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="product-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((p, index) => (
            <div key={index} className="product-card">
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">Rs. {p.price}/kg</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;