import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const login = async (data2) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data2
      );
      const data = response.data;
      const token = data.token;

      setToken(token);
      localStorage.setItem("token", data.token);

      await fetchUser(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  async function fetchUser(currentToken) {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Fetching user failed", error);
    } finally {
      setLoading(false);
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
      navigate("/login");
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
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        isAuthenticated,
        login,
        logout,
        loading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
