import { Text } from "@/components/atoms";
import { TransactionItem } from "@/components/molecules";
import { TransactionListProps } from "./type";

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  title = "Últimas transações",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Text variant="body" weight="semibold" className="text-[1.25rem]!">
        {title}
      </Text>

      <div className="flex flex-col max-h-[200px] overflow-y-auto">
        {transactions.length === 0 && (
          <Text variant="caption" weight="normal" className="text-base!">
            Nenhuma transação encontrada
          </Text>
        )}
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} {...transaction} />
        ))}
      </div>
    </div>
  );
};
