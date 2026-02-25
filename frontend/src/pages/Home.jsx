import ProductCard from "../components/ProductCard";

function Home() {

  const products = [
    { name:"Fresh Tomatoes", price:80, location:"Chitwan", image:"https://images.unsplash.com/photo-1546470427-e8b2b3c7d47f"},
    { name:"Organic Potatoes", price:60, location:"Kavre", image:"https://images.unsplash.com/photo-1582515073490-dc8f6c4a3b61"},
    { name:"Green Spinach", price:50, location:"Pokhara", image:"https://images.unsplash.com/photo-1576045057995-568f588f82fb"},
    { name:"Fresh Cauliflower", price:70, location:"Butwal", image:"https://images.unsplash.com/photo-1615484477778-ca3b77940c25"}
  ];

  return (
    <>
      <h1 style={{ textAlign:"center", marginTop:"40px" }}>
        Fresh Products from Farmers
      </h1>

      <div style={{
        display:"flex",
        gap:"25px",
        justifyContent:"center",
        flexWrap:"wrap",
        padding:"30px"
      }}>
        {products.map((item, index)=>(
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </>
  );
}

export default Home;