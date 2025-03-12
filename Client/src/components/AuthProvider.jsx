import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  // Handlig results messages
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data
      );
      const token = response.data.token;
      setToken(token);

      localStorage.setItem("token", response.data.token);
      fetchUser(token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  async function fetchUser(currentToken) {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Fetching user failed", error);
    }
  }

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
