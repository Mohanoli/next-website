"use client";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { AuthContext } from "../AuthContext";
import axiosInstance from "@/lib/config/AxiosConfig";
import { setCookie } from "@/lib/utilities/Helpers";
import { IUser, ICredentials } from "@/lib/types/AuthTypes";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState(true);

  // ── Logout ────────────────────────────────────────────────────────────────
  // Defined before useEffect so it's stable for the dependency array
  const logout = useCallback(() => {
    Cookies.remove("_at");
    setLoggedInUser({} as IUser);
  }, []);

  // ── Get profile ───────────────────────────────────────────────────────────
  const getLoggedInUserProfile = useCallback(async (): Promise<IUser> => {
    const response: any = await axiosInstance.get("/auth/profile");
    // Handle both shapes: { data: { user } } and { user }
    const user: IUser = response?.data?.user ?? response?.user ?? response?.data;
    setLoggedInUser(user);
    return user;
  }, []);

  // ── Boot: check existing session ─────────────────────────────────────────
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("_at");

      // No token — nothing to check, skip the network call entirely
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await getLoggedInUserProfile();
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (!error.response) {
            // Network-level failure (server down, DNS, CORS, etc.)
            // Don't log out — the token may still be valid once the server recovers.
            // Suppress the noisy console error in production.
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[AuthProvider] Network error during boot — server may be unreachable.",
                error.message
              );
            }
          } else if (status === 401 || status === 403) {
            // Token is definitively rejected by the server — clear it
            logout();
          } else {
            // Other server errors (500, etc.) — log but keep the session
          }
        } else {
          // Non-Axios error (programming error, etc.)
          //console.error("[AuthProvider] Unexpected error during auth check:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [getLoggedInUserProfile, logout]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = async (credentials: ICredentials) => {
    setIsLoading(true);
    try {
      const response: any = await axiosInstance.post("/auth/login", {
        username: credentials.email,
        password: credentials.password,
      });

      const token = response?.data?.token ?? response?.token;
      if (!token) throw new Error("No token received from server.");

      setCookie("_at", token, 1);
      await getLoggedInUserProfile();
    } finally {
      setIsLoading(false);
    }
  };

  // ── Register ──────────────────────────────────────────────────────────────
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", userData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        isLoading,
        getLoggedInUserProfile,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};