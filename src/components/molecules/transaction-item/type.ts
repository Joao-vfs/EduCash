export type TransactionType = "income" | "expense";

export type TransactionItemProps = {
  title: string;
  amount: number;
  isIncome: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};
