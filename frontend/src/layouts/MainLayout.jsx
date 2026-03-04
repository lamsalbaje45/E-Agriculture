import React from "react";
import { Outlet } from "react-router-dom";

// Main layout wraps content with padding/containers if needed
export default function MainLayout() {
  return (
    <div className="pt-16"> {/* account for navbar height */}
      <Outlet />
    </div>
  );
}