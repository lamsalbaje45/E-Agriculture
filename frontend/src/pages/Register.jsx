import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend logic - just form handling
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Register attempt:", { fullName, email, password, userType, agreedToTerms });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-luxury-cream via-[#F0F7F2] to-[#E8F3EC]">
      {/* Left Section - Sign-Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-luxury-lg p-10 border border-luxury-gold/20">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold text-[#1B3D2F] mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Join KrishiConnect today</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#1B3D2F] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-lg">👤</span>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Farmer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white text-[#1B3D2F] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1B3D2F] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-lg">✉️</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white text-[#1B3D2F] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#1B3D2F] mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-lg">🔐</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white text-[#1B3D2F] placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-lg hover:opacity-70 transition-opacity duration-200"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1B3D2F] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-lg">🔐</span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300 bg-white text-[#1B3D2F] placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3 text-lg hover:opacity-70 transition-opacity duration-200"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* User Type Selection */}
              <div>
                <label htmlFor="userType" className="block text-sm font-semibold text-[#1B3D2F] mb-2">
                  Account Type
                </label>
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full border border-luxury-gold/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                >
                  <option value="buyer">🛒 Buyer</option>
                  <option value="farmer">🌾 Farmer</option>
                </select>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className="w-4 h-4 rounded border-luxury-gold/20 text-luxury-gold focus:ring-luxury-gold cursor-pointer mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="#" className="text-luxury-gold hover:underline font-semibold">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-luxury-gold hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-luxury-gold to-[#D4AF37] hover:shadow-luxury text-[#1B3D2F] font-serif font-bold py-3 rounded-lg transition-all duration-300 mt-6"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-gold/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">or continue with</span>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-luxury-gold/20 rounded-lg hover:bg-luxury-cream transition-all duration-300 text-[#1B3D2F] font-semibold"
              >
                <span className="text-xl">🔵</span>
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-luxury-gold/20 rounded-lg hover:bg-luxury-cream transition-all duration-300 text-[#1B3D2F] font-semibold"
              >
                <span className="text-xl">f</span>
                Facebook
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-gray-700 text-sm mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-luxury-gold hover:underline font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#1B3D2F] to-[#2F6F4F] items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-8xl animate-bounce">🌾</div>
          <div className="absolute bottom-20 left-10 text-7xl">🥬</div>
          <div className="absolute top-1/3 left-1/4 text-9xl animate-pulse">🌱</div>
        </div>
        
        {/* Main Illustration Placeholder */}
        <div className="text-center z-10">
          <div className="text-[120px] mb-8 drop-shadow-lg">🌳</div>
          <h2 className="text-5xl font-serif font-bold text-white mb-4">
            Join Us
          </h2>
          <p className="text-xl text-luxury-gold/90 max-w-xs leading-relaxed">
            Become part of Nepal's premier agricultural marketplace
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold rounded-full opacity-5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-luxury-gold rounded-full opacity-5"></div>
      </div>
    </div>
  );
}