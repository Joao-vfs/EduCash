"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";
import { removeUserFromLocalStorage } from "@/lib/auth/storage";

/**
 * Hook para realizar logout do usuário
 */
export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      removeUserFromLocalStorage();
      await logoutAction();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      removeUserFromLocalStorage();
      router.push("/login");
    }
  };

  return { logout };
}

