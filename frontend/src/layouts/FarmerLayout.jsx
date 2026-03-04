import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/farmer/Sidebar";

// farmer area layout includes sidebar
export default function FarmerLayout() {
  return (
    <div className="flex min-h-screen pt-16">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#F5F7F5]">
        <Outlet />
      </main>
    </div>
  );
}