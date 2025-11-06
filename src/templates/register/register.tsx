"use client";

import { Button, Input, Progress, Text } from "@/components/atoms";
import { ChipGroup } from "@/components/molecules";
import { ROUTES } from "@/constants/routes/routes";
import { useFormValidation } from "@/hooks";
import { Arrow } from "@/icons";
import { confirmPassword, email, min, required } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { registerAction } from "@/lib/auth/actions";
import { saveUserToLocalStorage } from "@/lib/auth/storage";

export const RegisterTemplate: React.FC = () => {
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    email: string;
    nome: string;
    sobrenome: string;
  }>({
    email: "",
    nome: "",
    sobrenome: "",
  });
  const [passwordData, setPasswordData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const { validate, handleChange, handleBlur, getError } = useFormValidation({
    schema: {
      email: [required("Email é obrigatório"), email("Email inválido"), min(8)],
      nome: [required("Nome é obrigatório")],
      sobrenome: [required("Sobrenome é obrigatório")],
    },
  });

  const {
    validate: validatePassword,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    getError: getPasswordError,
  } = useFormValidation({
    schema: {
      password: [required("Senha é obrigatória"), min(8)],
      confirmPassword: [
        required("Confirmar senha é obrigatória"),
        confirmPassword("As senhas não coincidem"),
      ],
    },
  });

  const { push, back } = useRouter();

  const objectives = [
    { id: "1", label: "Estudar finanças", value: "study-finances" },
    { id: "2", label: "Guardar dinheiro", value: "save-money" },
    { id: "3", label: "Investir", value: "invest" },
    { id: "4", label: "Quitar dívidas", value: "pay-debt" },
    { id: "5", label: "Controlar gastos", value: "control-expenses" },
    { id: "6", label: "Aprender sobre", value: "learn-about" },
    { id: "7", label: "Planejar o futuro", value: "plan-future" },
    { id: "8", label: "Aumentar renda", value: "increase-income" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isPassword?: boolean
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (isPassword) {
      handlePasswordChange(name as keyof typeof passwordData, value, {
        ...passwordData,
      });
    } else {
      handleChange(name as keyof typeof formData, value, { ...formData });
    }
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    isPassword?: boolean
  ) => {
    const { name, value } = e.target;
    if (isPassword) {
      handlePasswordBlur(name as keyof typeof passwordData, value, {
        ...passwordData,
      });
    } else {
      handleBlur(name as keyof typeof formData, value, { ...formData });
      handlePasswordBlur(name as keyof typeof passwordData, value, {
        ...passwordData,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setRegisterError(null);
    
    if (step === 1) {
      if (!validate({ ...formData })) {
        return;
      }
      push(`${ROUTES.REGISTER_STEP}2`);
    } else if (step === 2) {
      if (selectedObjectives.length === 0) {
        setRegisterError("Selecione pelo menos um objetivo");
        return;
      }
      push(`${ROUTES.REGISTER_STEP}3`);
    } else if (step === 3) {
      if (!validatePassword({ ...passwordData })) {
        return;
      }
      
      setIsLoading(true);
      try {
        const result = await registerAction({
          name: `${formData.nome} ${formData.sobrenome}`,
          email: formData.email,
          password: passwordData.password,
        });

        if (result.success && result.user) {
          saveUserToLocalStorage(result.user);
          push(ROUTES.DASHBOARD);
        } else {
          setRegisterError(result.error || "Erro ao criar conta");
        }
      } catch (error) {
        setRegisterError("Erro ao conectar com o servidor");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStepsRegister: Record<number, ReactNode> = {
    1: (
      <div className="flex flex-col items-start justify-start gap-6 w-full">
        <Input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("nome")}
        />
        <Input
          name="sobrenome"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("sobrenome")}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("email")}
        />
      </div>
    ),
    2: (
      <div className="flex flex-col items-start justify-start gap-6 w-full">
        <ChipGroup
          title="Selecione seus objetivos:"
          options={objectives}
          selectedValues={selectedObjectives}
          onChange={setSelectedObjectives}
          multiple
          size="md"
        />
      </div>
    ),
    3: (
      <div className="flex flex-col items-start justify-start gap-6 w-full">
        <Input
          name="password"
          placeholder="Senha"
          type="password"
          value={passwordData.password}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getPasswordError("password")}
          disabled={isLoading}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirmar senha"
          type="password"
          value={passwordData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getPasswordError("confirmPassword")}
          disabled={isLoading}
        />
        {registerError && (
          <Text variant="caption" className="text-red-500">
            {registerError}
          </Text>
        )}
      </div>
    ),
  };

  const currentStep = renderStepsRegister[step] || renderStepsRegister[1];
  const progress = step === 1 ? 50 : step === 2 ? 75 : 100;

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Button variant="back" size="icon" onClick={() => back()}>
        <Arrow />
      </Button>
      <div className="h-full w-full flex flex-col items-center justify-evenly">
        <Image src="/logo.svg" alt="Logo" width={142} height={73} />

        <div className="w-full">
          <div className="flex flex-col items-start justify-start gap-6 mb-16">
            <Text variant="body" weight="medium" as="h1" className="text-2xl!">
              Crie sua conta
            </Text>
            <Text variant="caption" weight="normal" as="p">
              Crie sua conta e comece a aprender, competir e evoluir
              financeiramente!
            </Text>
          </div>

          <div className="mb-16">{currentStep}</div>

          <Button 
            type="submit" 
            className="w-full mb-16 lg:w-2xl cursor-pointer"
            disabled={(step === 2 && selectedObjectives.length === 0) || isLoading}
          >
            <div className="flex items-center justify-between px-4 w-full">
              {isLoading ? "Criando conta..." : step === 3 ? "Finalizar" : "Continuar"}
              <Arrow direction="right" />
            </div>
          </Button>

          <Progress progress={progress} />
        </div>
      </div>
    </form>
  );
};
