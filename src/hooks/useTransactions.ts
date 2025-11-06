import { useState, useCallback } from "react";
import {
  getTransactionsAction,
  registerTransaction,
  updateTransactionAction,
  deleteTransactionAction,
} from "@/lib/auth/actions";
import { GetTransactionsResponse } from "@/services/transactions/transactions";

export const useTransactions = (userId: string | undefined) => {
  const [transactions, setTransactions] = useState<GetTransactionsResponse[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadTransactions = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);

    try {
      const [responseGanhos, responseGastos] = await Promise.all([
        getTransactionsAction({ tipo: "ganhos", idUsuario: userId }),
        getTransactionsAction({ tipo: "gastos", idUsuario: userId }),
      ]);

      const ganhos = (
        responseGanhos.success ? responseGanhos.transactions || [] : []
      ).map((t) => ({ ...t, categoria: "ganhos" as const }));

      const gastos = (
        responseGastos.success ? responseGastos.transactions || [] : []
      ).map((t) => ({ ...t, categoria: "gastos" as const }));

      setTransactions([...ganhos, ...gastos]);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const createTransaction = async (
    tipo: "ganhos" | "gastos",
    name: string,
    valor: number
  ) => {
    if (!userId) return { success: false };

    await registerTransaction({
      idUsuario: userId,
      tipo,
      name,
      valor,
    });

    await loadTransactions();
  };

  const updateTransaction = async (
    id: number,
    tipo: "ganhos" | "gastos",
    name: string,
    valor: number
  ) => {
    if (!userId) return { success: false };

    await updateTransactionAction({
      id,
      idUsuario: userId,
      tipo,
      name,
      valor,
    });

    await loadTransactions();
  };

  const deleteTransaction = async (id: number, tipo: "ganhos" | "gastos") => {
    await deleteTransactionAction({ id, tipo });
    await loadTransactions();
  };

  return {
    transactions,
    isLoading,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
