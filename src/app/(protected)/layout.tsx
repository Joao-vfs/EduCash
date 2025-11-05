import { ReactNode } from "react";
import { getSession } from "@/lib/auth/session";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="w-full h-full min-h-screen p-6">{children}</div>
  );
}
