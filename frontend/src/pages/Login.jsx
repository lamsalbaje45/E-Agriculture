import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("buyer");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, null, userType);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-luxury-cream via-[#F0F7F2] to-[#E8F3EC]">
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-luxury-lg rounded-2xl w-96 border border-luxury-gold/20">
        <h2 className="text-4xl font-serif font-bold mb-2 text-center text-[#1B3D2F]">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-8">Sign in to your KrishiConnect account</p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1B3D2F] mb-2">Account Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full border border-luxury-gold/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          >
            <option value="buyer">🛒 Buyer</option>
            <option value="farmer">🌾 Farmer</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1B3D2F] mb-2">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full border border-luxury-gold/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#1B3D2F] mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-luxury-gold/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          />
        </div>

        <button className="bg-gradient-to-r from-luxury-gold to-[#D4AF37] text-[#1B3D2F] w-full py-3 rounded-lg font-serif font-bold hover:shadow-luxury transition-all duration-300">
          Sign In
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-luxury-gold font-semibold hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
}