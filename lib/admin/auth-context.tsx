"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AdminUser = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/admin/auth", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        const data = (await response.json()) as { user?: AdminUser };
        return data.user ?? null;
      })
      .then((authenticatedUser) => {
        if (isMounted) {
          setUser(authenticatedUser);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = (await response.json()) as {
      user?: AdminUser;
      message?: string;
    };

    if (!response.ok || !data.user) {
      throw new Error(data.message || "Unable to log in.");
    }

    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    void fetch("/api/admin/auth", { method: "DELETE" });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
