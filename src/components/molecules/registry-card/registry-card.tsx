import { Card, Text, IconButton } from "@/components/atoms";
import { RegistryCardProps } from "./type";

export const RegistryCard: React.FC<RegistryCardProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <Card
      variant="secondary"
      className="flex flex-col gap-4 cursor-pointer hover:bg-card-blue/80 transition-colors rounded-3xl!"
      onClick={onClick}
    >
      <IconButton size="md" className="pointer-events-none">
        {icon}
      </IconButton>

      <Text variant="body" weight="semibold" className="text-base!">
        {title}
      </Text>
    </Card>
  );
};
