import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";

function Navbar() {
  const location = useLocation();

  // Determine if we're on a light navbar route (login/register)
  const isLightNavbar = location.pathname === "/login" || location.pathname === "/register";

  // Define navbar styles based on route
  const navbarStyles = isLightNavbar
    ? "bg-white/95 backdrop-blur-md border-b border-luxury-gold/20 shadow-luxury"
    : "bg-gradient-to-r from-[#2F6F4F] to-[#24563D] shadow-luxury-lg border-b border-luxury-gold/10";

  const logoStyles = isLightNavbar
    ? "text-[#1E293B] hover:text-[#2F6F4F]"
    : "text-white hover:text-[#E8F3EC]";

  const linkStyles = (isActive) => {
    if (isLightNavbar) {
      return `font-medium transition-all duration-300 pb-1 border-b-2 ${
        isActive
          ? "text-[#2F6F4F] border-[#2F6F4F]"
          : "text-[#64748B] border-transparent hover:text-[#2F6F4F]"
      }`;
    } else {
      return `font-medium transition-all duration-300 pb-1 border-b-2 ${
        isActive
          ? "text-[#E8F3EC] border-[#E8F3EC]"
          : "text-white border-transparent hover:text-[#E8F3EC]"
      }`;
    }
  };

  const registerButtonStyles = isLightNavbar
    ? "bg-gradient-to-r from-[#2F6F4F] to-[#4C9A6A] text-white hover:shadow-luxury transition-all duration-300"
    : "bg-luxury-gold text-[#1B3D2F] hover:shadow-luxury transition-all duration-300 font-semibold";

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className={`sticky top-0 z-50 ${navbarStyles}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 transition-all duration-300 ${logoStyles}`}
        >
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold">KrishiConnect</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-6 sm:gap-8 items-center list-none">
          <li className="hidden sm:block">
            <Link
              to="/"
              className={linkStyles(location.pathname === "/")}
            >
              Home
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              to="/products"
              className={linkStyles(location.pathname === "/products")}
            >
              Products
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              to="/support"
              className={linkStyles(location.pathname === "/support")}
            >
              Support
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              to="/feedback"
              className={linkStyles(location.pathname === "/feedback")}
            >
              Feedback
            </Link>
          </li>

          {user ? (
            <>
              {user.userType === "buyer" && (
                <>
                  <li className="hidden sm:block">
                    <Link
                      to="/orders"
                      className={linkStyles(location.pathname === "/orders")}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout" className="relative">
                      🛒
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}

              {user.userType === "farmer" && (
                <li className="hidden sm:block">
                  <Link
                    to="/farmer"
                    className={linkStyles(location.pathname.startsWith("/farmer"))}
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="hidden sm:block">
                <Link
                  to="/login"
                  className={linkStyles(location.pathname === "/login")}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${registerButtonStyles}`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;