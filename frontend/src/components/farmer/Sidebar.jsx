import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  const location = useLocation();
  const items = [
    { to: "/farmer", label: "Dashboard" },
    { to: "/farmer/add-product", label: "Add Product" },
    { to: "/farmer/my-products", label: "My Products" },
    { to: "/farmer/orders", label: "Orders" },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen fixed top-16 pt-6">
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className={`block px-4 py-2 rounded transition-colors duration-200 ${
                location.pathname === i.to
                  ? "bg-forestGreen text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
