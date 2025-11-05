"use client";

import { Button, Input, Text } from "@/components/atoms";
import { useFormValidation } from "@/hooks";
import { Chevron } from "@/icons";
import { email, min, required } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginTemplate: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const { errors, validate, handleChange, handleBlur, getError } =
    useFormValidation({
      schema: {
        email: [required("Email é obrigatório"), email("Email inválido")],
        password: [required("Senha é obrigatória"), min(8)],
      },
    });

  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate(formData);
    if (Object.keys(errors).length === 0) {
      push("/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Button variant="back" size="icon" className="cursor-pointer">
        <Link href="/">
          <Chevron />
        </Link>
      </Button>
      <div className="h-full w-full flex flex-col items-center justify-evenly">
        <Image src="/logo.svg" alt="Logo" width={142} height={73} />

        <div className="flex flex-col items-start justify-start gap-6 lg:items-center lg:justify-center">
          <Text variant="body" weight="medium" as="h1" className="text-2xl! lg:text-4xl! lg:text-center">
            Entre com sua conta
          </Text>
          <Text variant="caption" weight="normal" as="p" className="text-base lg:text-lg lg:text-center">
            Entre e continue sua jornada financeira com aprendizado e diversão!
          </Text>
        </div>

        <div className="w-full lg:flex lg:flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col items-start justify-start gap-6 w-full mb-16 lg:w-2xl">
            <Input
              name="email"
              placeholder="Email"
              className="w-full lg:max-w-2xl"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                handleChange("email", e.target.value, formData);
              }}
              onBlur={(e) => handleBlur("email", e.target.value, formData)}
              error={getError("email")}
            />
            <Input
              name="password"
              placeholder="Senha"
              className="w-full lg:w-2xl"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                handleChange("password", e.target.value, formData);
              }}
              onBlur={(e) => handleBlur("password", e.target.value, formData)}
              error={getError("password")}
            />
          </div>

          <div className="flex flex-col items-start justify-start gap-6 w-full lg:items-center lg:justify-center">
            <Button variant="outline" size="lg" className="cursor-pointer lg:w-2xl">
              Esqueceu sua senha?
            </Button>
            <Button type="submit" className="cursor-pointer lg:w-2xl">
              <p>Confirmar e Entrar</p>
            </Button>
          </div>
        </div>

        <Link href="/register">Ainda não tem conta? Crie sua conta</Link>
      </div>
    </form>
  );
};
