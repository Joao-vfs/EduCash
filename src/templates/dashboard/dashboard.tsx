"use client";

import { Text, Button } from "@/components/atoms";
import { BalanceCard, RegistryCard } from "@/components/molecules";
import { TransactionList } from "@/components/organisms";
import { CreditCard } from "@/icons";
import { useState, useEffect, FormEvent } from "react";
import { getUserFromLocalStorage } from "@/lib/auth/storage";

type RegistryType = "income" | "expense";

export const DashboardTemplate: React.FC = () => {
  const [userName, setUserName] = useState("Usuário");
  const [balance] = useState(3000.0);
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
    // 'income' para ganhos, 'expense' para gastos
    const [modalType, setModalType] = useState<RegistryType | null>(null);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
};

const handleModalSubmit = (data: { name: string; value: string }) => {
    console.log("--- NOVO REGISTRO ---");
    console.log("Tipo:", modalType === "income" ? "Ganho" : "Gasto");
    console.log("Nome:", data.name);
    console.log("Valor:", data.value);
    console.log("--------------------");
    handleCloseModal();
};

  return (
    <div className="w-full h-full min-h-screen p-6 flex flex-col gap-8 relative">
        {" "}
        {/* Adicionado relative para o modal */}
        <div className="flex flex-col gap-2">
            <Text variant="caption" weight="normal" className="text-base!">
                Bem vindo de volta!
            </Text>
            <Text variant="body" weight="bold" className="text-2xl!">
                Olá, {userName}!
            </Text>
        </div>
        <BalanceCard balance={balance} onViewDetails={handleViewDetails}/>
        <div className="flex flex-col gap-4">
            <Text variant="body" weight="medium" className="text-xl">
                Registros
            </Text>
            <div className="grid grid-cols-2 gap-4">
                <RegistryCard
                    title="Registrar ganhos"
                    icon={<CreditCard size={24} className="text-green-500"/>}
                    onClick={handleRegisterIncome} // Função atualizada
                />
                <RegistryCard
                    title="Registrar gastos"
                    icon={<CreditCard size={24} className="text-red-500"/>}
                    onClick={handleRegisterExpense} // Função atualizada
                />
            </div>
        </div>
        <TransactionList transactions={transactions}/>
        <div className="flex flex-col gap-4">
            <Text variant="body" weight="medium" className="text-xl">
                Aulas
            </Text>
            <Button variant="outline-secondary" className="w-full">
                Funcionalidade indisponível
            </Button>
        </div>
        {/* --- RENDERIZAÇÃO DO MODAL --- */}
        {isModalOpen && modalType && (
            <RegistryModal
                type={modalType}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
            />
        )}
        {/* --- FIM DA RENDERIZAÇÃO DO MODAL --- */}
    </div>
);
}




// ---
// --- COMPONENTE MODAL ATUALIZADO (com o seu estilo)
// ---

interface RegistryModalProps {
  type: RegistryType;
  onClose: () => void;
  onSubmit: (data: { name: string; value: string }) => void;
}

const RegistryModal: React.FC<RegistryModalProps> = ({
                                                       type,
                                                       onClose,
                                                       onSubmit,
                                                   }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!name || !value) return;
      onSubmit({name, value});
  };

  const title = type === "income" ? "Registrar Ganho" : "Registrar Gasto";

  // O botão de submit será verde, como na sua imagem
  const submitButtonColor = "bg-green-500 hover:bg-green-600 text-white";

  return (
      // Overlay (fundo escuro, mais opaco como na imagem)
      <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-background/80  p-4">
          {/* Conteúdo do Modal (card claro) */}
          <div className="bg-blue/50 rounded-lg p-6 w-full max-w-md shadow-xl">
              {/* Cabeçalho */}
              <div className="flex justify-between items-center mb-6">
                  {" "}
                  {/* Mais margem inferior */}
                  <Text variant="body" weight="medium" className="text-xl">
                      {title}
                  </Text>
                  <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-800 text-2xl"
                  >
                      &times;
                  </button>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                      {/* O label não aparece na sua imagem, mas é bom para acessibilidade */}
                      {/* <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome
          </label> */}
                      <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          // Estilo do input da imagem: fundo cinza, sem borda, mais padding
                          className="w-full p-3 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                          placeholder="Nome" // "Escritório" na sua imagem
                          required
                      />
                  </div>

                  <div>
                      {/* <label htmlFor="value" className="block text-sm font-medium mb-1">
            Valor
          </label> */}
                      <input
                          type="number"
                          id="value"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          // Estilo do input da imagem: fundo cinza, sem borda, mais padding
                          className="w-full p-3 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                          placeholder="Valor"
                          min="0.01"
                          step="0.01"
                          required
                      />
                  </div>

                  {/* Botões - Ordem invertida para "Cancelar" vir antes */}
                  <div className="flex justify-end gap-3 mt-4">
                      {/* Este botão usa o 'variant' que você já tem no seu projeto.
            Baseado na sua imagem, 'outline-secondary' deve ser o botão roxo/azul.
          */}
                      <Button type="button" variant="outline-secondary" onClick={onClose}>
                          Cancelar
                      </Button>

                      {/* Este é o botão verde "Registrar" da sua imagem */}
                      <Button type="submit" className={submitButtonColor}>
                          Registrar
                      </Button>
                  </div>
              </form>
          </div>
      </div>
  );
};
