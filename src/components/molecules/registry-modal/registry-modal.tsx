"use client";

import { FormEvent, useState, useEffect } from "react";
import { Button, Text } from "@/components/atoms";
import { RegistryModalProps } from "./type";

export const RegistryModal: React.FC<RegistryModalProps> = ({
  isOpen,
  type,
  onClose,
  onSubmit,
  initialName = "",
  initialValue = "",
  isEditing = false,
}) => {
  const [name, setName] = useState(initialName);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setValue(initialValue);
    }
  }, [isOpen, initialName, initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !value) return;
    onSubmit({ name, value });
  };

  const title = isEditing
    ? type === "income"
      ? "Editar Ganho"
      : "Editar Gasto"
    : type === "income"
    ? "Registrar Ganho"
    : "Registrar Gasto";

  const submitButtonColor = "bg-green-500 hover:bg-green-600 text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-blue/50 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder="Nome"
              required
            />
          </div>

          <div>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              placeholder="Valor"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline-secondary" onClick={onClose}>
              Cancelar
            </Button>

            <Button type="submit" className={submitButtonColor}>
              {isEditing ? "Salvar" : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

