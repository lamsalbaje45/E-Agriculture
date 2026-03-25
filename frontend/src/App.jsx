import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import ScrollToTopButton from "./components/ScrollToTopButton";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import BuyerHomePage from "./pages/BuyerHomePage";
import OrderCheckoutPage from "./pages/OrderCheckoutPage";
import FarmerLocationPage from "./pages/FarmerLocationPage";
import EsewaCallbackPage from "./pages/EsewaCallbackPage";

function AppShell({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <AppShell>
                <BuyerHomePage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "farmer"]}>
              <AppShell>
                <DashboardPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppShell>
                <ProductsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:productId"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <AppShell>
                <OrderCheckoutPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:productId/location"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <AppShell>
                <FarmerLocationPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments/esewa/success"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <AppShell>
                <EsewaCallbackPage isSuccess />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments/esewa/failure"
          element={
            <ProtectedRoute roles={["buyer"]}>
              <AppShell>
                <EsewaCallbackPage isSuccess={false} />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <AppShell>
                <OrdersPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AppShell>
                <ChatPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <AppShell>
                <NotificationsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppShell>
                <ProfilePage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AppShell>
                <AdminUsersPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}
