"use client";

import { Button, Input, Text } from "@/components/atoms";
import { useFormValidation } from "@/hooks";
import { Chevron } from "@/icons";
import { email, min, required } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "@/lib/auth/actions";
import { saveUserToLocalStorage } from "@/lib/auth/storage";

export const LoginTemplate: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { validate, handleChange, handleBlur, getError } =
    useFormValidation({
      schema: {
        email: [required("Email é obrigatório"), email("Email inválido")],
        password: [required("Senha é obrigatória"), min(8)],
      },
    });

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);
    
    const isValid = validate(formData);
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginAction({
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.user) {
        saveUserToLocalStorage(result.user);
        push("/dashboard");
      } else {
        setLoginError(result.error || "Erro ao fazer login");
      }
    } catch (error) {
      setLoginError("Erro ao conectar com o servidor");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Button variant="back" size="icon">
        <Link href="/">
          <Chevron />
        </Link>
      </Button>
      <div className="h-full w-full flex flex-col items-center justify-evenly">
        <Image src="/logo.svg" alt="Logo" width={142} height={73} />

        <div className="flex flex-col items-start justify-start gap-6">
          <Text variant="body" weight="medium" as="h1" className="text-2xl!">
            Entre com sua conta
          </Text>
          <Text variant="caption" weight="normal" as="p">
            Entre e continue sua jornada financeira com aprendizado e diversão!
          </Text>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-start justify-start gap-6 w-full mb-16">
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                handleChange("email", e.target.value, formData);
              }}
              onBlur={(e) => handleBlur("email", e.target.value, formData)}
              error={getError("email")}
              disabled={isLoading}
            />
            <Input
              name="password"
              placeholder="Senha"
              type="password"
              className="w-full lg:w-2xl"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                handleChange("password", e.target.value, formData);
              }}
              onBlur={(e) => handleBlur("password", e.target.value, formData)}
              error={getError("password")}
              disabled={isLoading}
            />
            {loginError && (
              <Text variant="caption" className="text-red-500">
                {loginError}
              </Text>
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-6 w-full lg:items-center lg:justify-center">
            <Button variant="outline" size="lg" disabled={isLoading} className="w-full lg:w-2xl">
              Esqueceu sua senha?
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full lg:w-2xl">
              <p>{isLoading ? "Entrando..." : "Confirmar e Entrar"}</p>
            </Button>
          </div>
        </div>

        <Link href="/register">Ainda não tem conta? Crie sua conta</Link>
      </div>
    </form>
  );
};
