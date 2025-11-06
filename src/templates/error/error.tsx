"use client";

import { useEffect } from "react";
import { Button, Text } from "@/components/atoms";

type ErrorTemplateProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export const ErrorTemplate: React.FC<ErrorTemplateProps> = ({
  error,
  reset,
}) => {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <Text variant="body" weight="bold" className="text-6xl text-red-500">
            Oops!
          </Text>
          <Text variant="body" weight="bold" className="text-2xl">
            Algo deu errado
          </Text>
        </div>

        <div className="flex flex-col gap-2">
          <Text variant="body" weight="normal" className="text-gray-600 dark:text-gray-400">
            Desculpe, encontramos um erro inesperado.
          </Text>
          {error.message && (
            <Text variant="caption" weight="normal" className="text-sm text-gray-500 dark:text-gray-500">
              {error.message}
            </Text>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button onClick={reset} variant="primary" className="w-full">
            Tentar novamente
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline-secondary"
            className="w-full"
          >
            Voltar para o início
          </Button>
        </div>

        {error.digest && (
          <Text variant="caption" weight="normal" className="text-xs text-gray-400">
            Error ID: {error.digest}
          </Text>
        )}
      </div>
    </div>
  );
};

