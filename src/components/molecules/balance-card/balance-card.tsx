import { Card, Text, IconButton } from "@/components/atoms";
import { Arrow } from "@/icons";
import { formatCurrency } from "@/utils";

export type BalanceCardProps = {
  balance: number;
  onViewDetails?: () => void;
};

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  onViewDetails,
}) => {
  return (
    <Card variant="gradient" className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <Text
          variant="caption"
          weight="normal"
          className="text-text-white! text-14px!"
        >
          Saldo Total
        </Text>
        <Text
          variant="body"
          weight="semibold"
          className="text-3xl! text-text-white!"
        >
          {formatCurrency(balance)}
        </Text>
      </div>

      <IconButton variant="secondary" size="md" onClick={onViewDetails}>
        <Arrow />
      </IconButton>
    </Card>
  );
};
