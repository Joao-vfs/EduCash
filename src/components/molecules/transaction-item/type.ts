export type TransactionType = "income" | "expense";

export type TransactionItemProps = {
  title: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

