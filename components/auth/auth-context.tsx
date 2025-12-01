"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Update state asynchronously to avoid linter warning
        setTimeout(() => {
          setUser(parsedUser);
          setIsLoggedIn(true);
        }, 0);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // If parsing fails, clear the invalid data
        localStorage.removeItem("adminUser");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple validation - in a real app, you would verify credentials against a database
    // For demo purposes, we'll accept any non-empty email and password
    if (email && password) {
      const userData = { email };
      localStorage.setItem("adminUser", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
