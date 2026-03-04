import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("krishiconnect_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, userType = "buyer") => {
    // Mock login - no backend validation
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      userType, // "buyer" or "farmer"
      name: email.split("@")[0],
      loginTime: new Date(),
    };
    setUser(userData);
    localStorage.setItem("krishiconnect_user", JSON.stringify(userData));
    return userData;
  };

  const register = (name, email, userType = "buyer") => {
    // Mock registration
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      userType,
      registeredAt: new Date(),
    };
    setUser(userData);
    localStorage.setItem("krishiconnect_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("krishiconnect_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
