"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function loginAction(credentials: LoginCredentials) {
  try {
    if (credentials.email && credentials.password) {
      await createSession({
        id: "1",
        name: "Usuário Exemplo",
        email: credentials.email,
      });

      return { success: true };
    }

    return { success: false, error: "Credenciais inválidas" };
  } catch (error) {
    return { success: false, error: "Erro ao fazer login" };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    await createSession({
      id: "1",
      name: data.name,
      email: data.email,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao registrar" };
  }
}
