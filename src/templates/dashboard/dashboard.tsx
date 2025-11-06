"use client";

import { useEffect, useState } from "react";
import { Text, Button } from "@/components/atoms";
import {
  BalanceCard,
  RegistryCard,
  ConfirmDialog,
  RegistryModal,
  RegistryType,
} from "@/components/molecules";
import { TransactionList } from "@/components/organisms";
import { CreditCard } from "@/icons";
import { useAuth } from "@/providers/AuthProvider";
import { useTransactions, useModal } from "@/hooks";
import { GetTransactionsResponse } from "@/services/transactions/transactions";

export const DashboardTemplate: React.FC = () => {
  const { user } = useAuth();
  const [balance] = useState(3000.0);

  const registryModal = useModal();
  const [modalType, setModalType] = useState<RegistryType | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<GetTransactionsResponse | null>(null);

  const [transactionToDelete, setTransactionToDelete] = useState<GetTransactionsResponse | null>(null);

  const {
    transactions,
    isLoading,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions(user?.id);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleOpenIncomeModal = () => {
    setModalType("income");
    setEditingTransaction(null);
    registryModal.open();
  };

  const handleOpenExpenseModal = () => {
    setModalType("expense");
    setEditingTransaction(null);
    registryModal.open();
  };

  const handleCloseModal = () => {
    registryModal.close();
    setModalType(null);
    setEditingTransaction(null);
  };

  const handleSubmitModal = async (data: { name: string; value: string }) => {
    if (!modalType) return;

    const tipo = modalType === "income" ? "ganhos" : "gastos";
    const valor = parseFloat(data.value);

    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, tipo, data.name, valor);
    } else {
      await createTransaction(tipo, data.name, valor);
    }

    handleCloseModal();
  };

  const handleEditTransaction = (transaction: GetTransactionsResponse) => {
    setEditingTransaction(transaction);
    setModalType(transaction.categoria === "ganhos" ? "income" : "expense");
    registryModal.open();
  };

  const handleDeleteTransaction = (transaction: GetTransactionsResponse) => {
    setTransactionToDelete(transaction);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;

    await deleteTransaction(
      transactionToDelete.id,
      transactionToDelete.categoria || "ganhos"
    );

    setTransactionToDelete(null);
  };

  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

  const transactionsItemProps = transactions.map((transaction) => ({
    title: transaction.tipo,
    amount: transaction.valor,
    isIncome: transaction.categoria === "ganhos",
    onEdit: () => handleEditTransaction(transaction),
    onDelete: () => handleDeleteTransaction(transaction),
  }));

  return (
    <div className="w-full h-full min-h-screen p-6 flex flex-col gap-8 relative">
      <div className="flex flex-col gap-2">
        <Text variant="caption" weight="normal" className="text-base!">
          Bem vindo de volta!
        </Text>
        <Text variant="body" weight="bold" className="text-2xl!">
          Olá, {user?.name}!
        </Text>
      </div>

      <BalanceCard balance={balance} onViewDetails={() => {}} />

      <div className="flex flex-col gap-4">
        <Text variant="body" weight="medium" className="text-xl">
          Registros
        </Text>
        <div className="grid grid-cols-2 gap-4">
          <RegistryCard
            title="Registrar ganhos"
            icon={<CreditCard size={24} className="text-green-500" />}
            onClick={handleOpenIncomeModal}
          />
          <RegistryCard
            title="Registrar gastos"
            icon={<CreditCard size={24} className="text-red-500" />}
            onClick={handleOpenExpenseModal}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Text variant="body" weight="normal" className="text-gray-500">
            Carregando transações...
          </Text>
        </div>
      ) : (
        <TransactionList transactions={transactionsItemProps} />
      )}

      <div className="flex flex-col gap-4">
        <Text variant="body" weight="medium" className="text-xl">
          Aulas
        </Text>
        <Button variant="outline-secondary" className="w-full">
          Funcionalidade indisponível
        </Button>
      </div>

      {modalType && (
        <RegistryModal
          isOpen={registryModal.isOpen}
          type={modalType}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
          initialName={editingTransaction?.tipo || ""}
          initialValue={editingTransaction?.valor.toString() || ""}
          isEditing={!!editingTransaction}
        />
      )}

      <ConfirmDialog
        isOpen={!!transactionToDelete}
        title="Deletar Transação"
        message={`Tem certeza que deseja deletar a transação "${transactionToDelete?.tipo}"? Esta ação não pode ser desfeita.`}
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        variant="danger"
      />
    </div>
  );
};
