import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// layouts
import MainLayout from "./layouts/MainLayout";
import FarmerLayout from "./layouts/FarmerLayout";

// pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import CustomerSupport from "./pages/CustomerSupport";
import Feedback from "./pages/Feedback";
import FarmerDashboard from "./pages/farmer/Dashboard";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/MyProducts";
import FarmerOrders from "./pages/farmer/Orders";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />

        <Routes>
          {/* public and buyer routes wrapped in main layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="checkout"
              element={
                <ProtectedRoute requiredUserType="buyer">
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedRoute requiredUserType="buyer">
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route path="support" element={<CustomerSupport />} />
            <Route path="feedback" element={<Feedback />} />
            <Route
              path="orders"
              element={
                <ProtectedRoute requiredUserType="buyer">
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* farmer-specific routes */}
          <Route path="/farmer" element={<FarmerLayout />}>
            <Route
              index
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-product"
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-products"
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <MyProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <FarmerOrders />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>

        <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}