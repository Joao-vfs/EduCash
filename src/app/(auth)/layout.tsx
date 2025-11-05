import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="h-screen w-full bg-background p-6">{children}</div>;
}
