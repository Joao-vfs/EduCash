export type RegistryType = "income" | "expense";

export type RegistryModalProps = {
  isOpen: boolean;
  type: RegistryType;
  onClose: () => void;
  onSubmit: (data: { name: string; value: string }) => void;
  initialName?: string;
  initialValue?: string;
  isEditing?: boolean;
};

