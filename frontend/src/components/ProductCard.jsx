function ProductCard({ name, price, location, image }) {
  return (
    <div style={{
      width: "250px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "white"
    }}>
      
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <div style={{ padding: "15px" }}>
        <h3>{name}</h3>
        <p><b>Rs. {price} /kg</b></p>
        <p style={{ color: "gray" }}>{location}</p>
        <button style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;