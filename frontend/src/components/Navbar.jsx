import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          <Link to="/">KrishiConnect</Link>
        </div>

        <ul className="nav-links">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>

          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">Products</Link>
          </li>

          <li className={location.pathname === "/login" ? "active" : ""}>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/register" className="register-btn">Register</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;