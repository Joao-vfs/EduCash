import { STORAGE_KEYS } from "@/constants/auth/auth";

type UserData = {
  id: string;
  name: string;
  email: string;
};

/**
 * Salva dados do usuário no localStorage
 */
export function saveUserToLocalStorage(user: UserData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  } catch (error) {
    console.error("Erro ao salvar usuário no localStorage:", error);
  }
}

/**
 * Obtém dados do usuário do localStorage
 */
export function getUserFromLocalStorage(): UserData | null {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Erro ao ler usuário do localStorage:", error);
    return null;
  }
}

/**
 * Remove dados do usuário do localStorage
 */
export function removeUserFromLocalStorage(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error("Erro ao remover usuário do localStorage:", error);
  }
}

