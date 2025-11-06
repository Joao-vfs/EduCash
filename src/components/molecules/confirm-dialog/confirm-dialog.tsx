import { Button, Text } from "@/components/atoms";
import { ConfirmDialogProps } from "./type";

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    info: "bg-blue hover:bg-blue/90",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Text variant="body" weight="bold" className="text-xl">
              {title}
            </Text>
            <Text variant="body" weight="normal" className="text-sm text-gray-600 dark:text-gray-400">
              {message}
            </Text>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={onCancel}
              className="flex-1"
            >
              {cancelText}
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              className={`flex-1 ${variantStyles[variant]} text-white`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

