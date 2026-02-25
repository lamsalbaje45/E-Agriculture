import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      backgroundColor: "#2e7d32",
      color: "white"
    }}>
      <h2>KrishiConnect</h2>

      <div style={{display:"flex", gap:"20px"}}>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Login</a>
        <a href="#">Register</a>

        <div style={{display:"flex", gap:"20px"}}>
  <Link to="/">Home</Link>
  <Link to="/">Products</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
</div>
      </div>
    </nav>
  );
}

export default Navbar;