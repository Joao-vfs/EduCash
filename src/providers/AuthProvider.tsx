"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Session } from "@/lib/auth/session";

type AuthContextType = {
  user: Session["user"] | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const value: AuthContextType = {
    user: session?.user || null,
    isAuthenticated: !!session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
