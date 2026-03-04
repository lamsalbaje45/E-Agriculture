import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1B3D2F] to-[#051a10] text-white py-16 mt-16 shadow-luxury-lg border-t border-luxury-gold/20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Logo className="w-10 h-10" />
            <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-white to-luxury-gold/80 bg-clip-text text-transparent">
              KrishiConnect
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Connecting farmers directly with consumers for fair pricing and fresh, organic produce.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-luxury-gold transition">Home</a></li>
            <li><a href="/products" className="hover:text-luxury-gold transition">Products</a></li>
            <li><a href="/support" className="hover:text-luxury-gold transition">Support</a></li>
            <li><a href="/feedback" className="hover:text-luxury-gold transition">Feedback</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
          <p className="text-gray-300 mb-2">📧 support@krishiconnect.com</p>
          <p className="text-gray-300 mb-2">📱 +977 98XXXXXXXX</p>
          <p className="text-gray-300">📍 Nepal</p>
        </div>
      </div>

      <div className="border-t border-luxury-gold/20 pt-8">
        <p className="text-center text-gray-400 text-sm">
          © 2026 KrishiConnect Nepal. All rights reserved. | Premium Agriculture Platform
        </p>
      </div>
    </footer>
  );
}