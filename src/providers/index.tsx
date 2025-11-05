import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import type { Session } from "@/lib/auth/session";

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <AuthProvider session={session}>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
