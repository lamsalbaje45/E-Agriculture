import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import api from "../api";

const AuthContext = createContext(null);
let socket;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  async function loadUnreadNotifications() {
    const response = await api.get("/notifications");
    const unreadCount = response.data.filter((item) => !item.is_read).length;
    setUnreadNotifications(unreadCount);
    return unreadCount;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then(async (response) => {
        setUser(response.data);
        await loadUnreadNotifications();
      })
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");
    socket.emit("user:join", user.id);

    const onNotification = () => {
      setUnreadNotifications((current) => current + 1);
    };

    socket.on("notification:new", onNotification);

    return () => {
      socket?.off("notification:new", onNotification);
      socket?.disconnect();
    };
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      socket,
      unreadNotifications,
      async login(credentials) {
        const response = await api.post("/auth/login", credentials);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        await loadUnreadNotifications();
        return response.data.user;
      },
      async register(payload) {
        const response = await api.post("/auth/register", payload);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        await loadUnreadNotifications();
        return response.data.user;
      },
      async refreshUser() {
        const response = await api.get("/auth/me");
        setUser(response.data);
        return response.data;
      },
      async refreshNotifications() {
        return loadUnreadNotifications();
      },
      logout() {
        localStorage.removeItem("token");
        setUser(null);
        setUnreadNotifications(0);
        socket?.disconnect();
      },
    }),
    [user, loading, unreadNotifications]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
