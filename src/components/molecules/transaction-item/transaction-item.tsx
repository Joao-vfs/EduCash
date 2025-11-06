import { Text, IconButton } from "@/components/atoms";
import { Arrow, Edit, Trash } from "@/icons";
import { formatCurrency } from "@/utils";
import { TransactionItemProps } from "./type";

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  amount,
  isIncome,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <IconButton variant="primary" size="md">
          {isIncome ? <Arrow direction="up" /> : <Arrow direction="down" />}
        </IconButton>

        <div className="flex flex-col gap-2">
          <Text variant="body" weight="medium" className="text-sm">
            {title}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end gap-2">
          <Text variant="body" weight="medium" className={`text-sm! `}>
            {isIncome ? "+" : "-"}
            {formatCurrency(amount)}
          </Text>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Editar transação"
            >
              <Edit size={18} className="text-blue-500" />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Deletar transação"
            >
              <Trash size={18} className="text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
