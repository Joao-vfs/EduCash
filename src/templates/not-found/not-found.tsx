"use client";

import { Button, Text } from "@/components/atoms";

export const NotFoundTemplate: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <Text variant="body" weight="bold" className="text-9xl text-blue">
            404
          </Text>
          <Text variant="body" weight="bold" className="text-2xl">
            Página não encontrada
          </Text>
        </div>

        <div className="flex flex-col gap-2">
          <Text variant="body" weight="normal" className="text-gray-600 dark:text-gray-400">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </Text>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Button
            onClick={() => (window.location.href = "/")}
            variant="primary"
            className="w-full"
          >
            Voltar para o início
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline-secondary"
            className="w-full"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

