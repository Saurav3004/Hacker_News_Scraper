import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setLoading(false);
  };

  const register = async (data) => {
    setLoading(true);
    const res = await API.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);