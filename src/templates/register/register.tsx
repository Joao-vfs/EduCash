"use client";

import { Button, Input, Progress, Text } from "@/components/atoms";
import { ChipGroup } from "@/components/molecules";
import { ROUTES } from "@/constants/routes/routes";
import { useFormValidation } from "@/hooks";
import {Arrow, Chevron} from "@/icons";
import { confirmPassword, email, min, required } from "@/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (step === 1) {
      if (!validate({ ...formData })) {
        return;
      }
      push(`${ROUTES.REGISTER_STEP}2`);
    } else if (step === 2) {
      if (selectedObjectives.length === 0) {
        alert("Selecione pelo menos um objetivo");
        return;
      }
      push(`${ROUTES.REGISTER_STEP}3`);
    } else if (step === 3) {
      if (!validatePassword({ ...passwordData })) {
        return;
      }
      console.log("Dados finais:", { formData, selectedObjectives, passwordData });
      // Aqui você pode enviar os dados para o backend
      push(ROUTES.LOGIN);
    }
  };

  const renderStepsRegister: Record<number, ReactNode> = {
    1: (
      <div className="flex flex-col items-start justify-start gap-6 w-full lg:items-center lg:justify-center">
        <Input
          name="nome"
          placeholder="Nome"
          className="lg:w-2xl"
          value={formData.nome}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("nome")}
        />
        <Input
          name="sobrenome"
          placeholder="Sobrenome"
          className="lg:w-2xl"
          value={formData.sobrenome}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("sobrenome")}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          className="lg:w-2xl"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getError("email")}
        />
      </div>
    ),
    2: (
      <div className="flex flex-col items-start justify-start gap-6 w-full lg:items-center lg:justify-center">
        <ChipGroup
          title="Selecione seus objetivos:"
          options={objectives}
          className="lg:w-2xl"
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
          className="lg:w-2xl"
          value={passwordData.password}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getPasswordError("password")}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirmar senha"
          type="password"
          className="lg:w-2xl"
          value={passwordData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={getPasswordError("confirmPassword")}
        />
      </div>
    ),
  };

  const currentStep = renderStepsRegister[step] || renderStepsRegister[1];
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Button variant="back" size="icon" onClick={() => back()}>
        <Chevron/>
      </Button>
      <div className="h-full w-full flex flex-col items-center justify-evenly lg:items-center lg:justify-center">
        <Image src="/logo.svg" alt="Logo" width={142} height={73}  className="mb-12 lg:mb-16"/>

        <div className="w-full flex flex-col items-center justify-center" >
          <div className="flex flex-col items-start justify-start gap-6 mb-16 lg:items-center lg:justify-center">
            <Text variant="body" weight="medium" as="h1" className="text-2xl! lg:text-4xl!">
              Crie sua conta
            </Text>
            <Text variant="caption" weight="normal" as="p" className="text-base lg:text-lg lg:text-center">
              Crie sua conta e comece a aprender, competir e evoluir
              financeiramente!
            </Text>
          </div>

          <div className="mb-16">{currentStep}</div>

          <Button 
            type="submit" 
            className="w-full mb-16 lg:w-2xl"
            disabled={step === 2 && selectedObjectives.length === 0}
          >
            <div className="flex items-center justify-between px-4 w-full">
              {step === 3 ? "Finalizar" : "Continuar"}
              <Arrow direction="right" />
            </div>
          </Button>

          <Progress progress={progress}/>
        </div>
      </div>
    </form>
  );
};
