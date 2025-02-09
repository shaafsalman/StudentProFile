import React, { createContext, useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { bookingsState } from "./../store/store";
import { login as apiLogin, signup as apiSignup } from "../api/authService";
import {jwtDecode} from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useRecoilState(bookingsState);

  const logout = () => {
    setUser(null);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("token");
  };

  const logoutWithMessage = (message) => {
    logout();
    alert(message);
  };

  const handleApiError = (error) => {
    if (error.response?.status === 401) {
      const errorMessage =
        error.response?.data?.message === "Authorization token required."
          ? "Session Expired"
          : "Invalid credentials.";
      logoutWithMessage(errorMessage);
    }
    throw error;
  };

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      if (!response.success) {
        return { success: false, message: response.message };
      }

      const { token } = response;

      const userData = jwtDecode(token);
      document.cookie = `token=${token}; path=/`;
      localStorage.setItem("token", token);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      handleApiError(error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    }
  };

  const signup = async (userData) => {
    try {
      // Attempt to sign up the user by calling the API
      const response = await apiSignup(userData);
      
      return response;
    } catch (error) {
      // If the API call fails, return the full error response
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed. Please try again.",
        statusCode: error.response?.status || 500,
        data: error.response?.data || {},
      };
    }
  };
  
  const checkToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) return logout();

      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        return logoutWithMessage("Session Expired");
      }

      setUser(decoded);
    } catch (error) {
      logoutWithMessage("Session Expired");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
