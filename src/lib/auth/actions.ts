"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { authService } from "../../services/auth/auth";

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function loginAction(credentials: LoginCredentials) {
  try {
    const response = await authService.login(credentials.email, credentials.password);
    
    await createSession({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
    });

    return { 
      success: true,
      user: response.user
    };
  } catch (error) {
    return { success: false, error: "Email ou senha inválidos" };
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
    const response = await authService.register(data.name, data.email, data.password);
    
    await createSession({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
    });

    return { 
      success: true,
      user: response.user
    };
  } catch (error) {
    return { success: false, error: "Erro ao registrar usuário" };
  }
}
