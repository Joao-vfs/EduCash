"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { authService } from "../../services/auth/auth";
import { transactionsService } from "@/services/transactions/transactions";

export type LoginCredentials = {
  email: string;
  password: string;
};

export async function loginAction(credentials: LoginCredentials) {
  try {
    const response = await authService.login(
      credentials.email,
      credentials.password
    );

    await createSession({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
    });

    return {
      success: true,
      user: response.user,
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
    const response = await authService.register(
      data.name,
      data.email,
      data.password
    );

    await createSession({
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
    });

    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    return { success: false, error: "Erro ao registrar usuário" };
  }
}

export async function registerTransaction(data: {
  idUsuario: string;
  tipo: "ganhos" | "gastos";
  name: string;
  valor: number;
}) {
  try {
    const response = await transactionsService.createTransaction(data);
    return { success: true, transaction: response };
  } catch (error) {
    return { success: false, error: "Erro ao registrar transação" };
  }
}

export async function getTransactionsAction(data: {
  tipo: "ganhos" | "gastos";
  idUsuario: string;
}) {
  try {
    const response = await transactionsService.getTransactions(data.tipo, data.idUsuario);
    return { success: true, transactions: response };
  } catch (error) {
    return { success: false, error: "Erro ao buscar transações" };
  }
}

export async function updateTransactionAction(data: {
  id: number;
  idUsuario: string;
  tipo: "ganhos" | "gastos";
  name: string;
  valor: number;
}) {
  try {
    const response = await transactionsService.updateTransaction(
      data.id,
      data.tipo,
      data.idUsuario,
      data.name,
      data.valor
    );
    return { success: true, transaction: response };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar transação" };
  }
}

export async function deleteTransactionAction(data: {
  id: number;
  tipo: "ganhos" | "gastos";
}) {
  try {
    await transactionsService.deleteTransaction(data.id, data.tipo);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao deletar transação" };
  }
}
