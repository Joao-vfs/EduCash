"use client";

import { Text, Button } from "@/components/atoms";
import { BalanceCard, RegistryCard } from "@/components/molecules";
import { TransactionList } from "@/components/organisms";
import { CreditCard } from "@/icons";
import { useState } from "react";

export const DashboardTemplate: React.FC = () => {
  const [userName] = useState("John");
  const [balance] = useState(3000.0);

  const transactions = [
    {
      title: "Pix recebido devolvido",
      description: "Pix Paulista",
      amount: 23.0,
      type: "expense" as const,
      date: "18/10",
    },
    {
      title: "Pix recebido",
      description: "FIAP Paulista",
      amount: 23.0,
      type: "income" as const,
      date: "18/10",
    },
    {
      title: "Salário recebido",
      description: "TOTVS",
      amount: 3000.0,
      type: "income" as const,
      date: "15/10",
    },
  ];

  const handleViewDetails = () => {
    console.log("Ver detalhes do saldo");
  };

  const handleRegisterIncome = () => {
    console.log("Registrar ganhos");
  };

  const handleRegisterExpense = () => {
    console.log("Registrar gastos");
  };

  return (
    <div className="w-full h-full min-h-screen p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Text variant="caption" weight="normal" className="text-base!">
          Bem vindo de volta!
        </Text>
        <Text variant="body" weight="bold" className="text-2xl!">
          Olá, {userName}!
        </Text>
      </div>

      <BalanceCard balance={balance} onViewDetails={handleViewDetails} />

      <div className="flex flex-col gap-4">
        <Text variant="body" weight="medium" className="text-xl">
          Registros
        </Text>
        
        <div className="grid grid-cols-2 gap-4">
          <RegistryCard
            title="Registrar ganhos"
            icon={<CreditCard size={24} className="text-green-500" />}
            onClick={handleRegisterIncome}
          />
          <RegistryCard
            title="Registrar gastos"
            icon={<CreditCard size={24} className="text-red-500" />}
            onClick={handleRegisterExpense}
          />
        </div>
      </div>

      <TransactionList transactions={transactions} />

      <div className="flex flex-col gap-4">
        <Text variant="body" weight="medium" className="text-xl">
          Aulas
        </Text>
        
        <Button variant="outline-secondary" className="w-full">
          Funcionalidade indisponível
        </Button>
      </div>
    </div>
  );
};
