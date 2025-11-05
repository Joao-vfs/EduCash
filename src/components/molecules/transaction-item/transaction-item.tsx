import { Text, IconButton } from "@/components/atoms";
import { Arrow } from "@/icons";
import { formatCurrency } from "@/utils";
import { TransactionItemProps } from "./type";

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  description,
  amount,
  type,
  date,
}) => {
  const isIncome = type === "income";

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
          <Text variant="caption" weight="normal" className="text-xs">
            {description}
          </Text>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Text variant="body" weight="medium" className={`text-sm! `}>
          {isIncome ? "+" : "-"}
          {formatCurrency(amount)}
        </Text>
        <Text variant="caption" weight="normal" className="text-xs">
          {date}
        </Text>
      </div>
    </div>
  );
};
