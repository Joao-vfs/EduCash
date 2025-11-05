import { Chip } from "@/components/atoms/chip";
import { Text } from "@/components/atoms";
import { ChipGroupProps } from "./type";

export const ChipGroup: React.FC<ChipGroupProps> = ({
  title,
  options,
  selectedValues = [],
  onChange,
  multiple = true,
  size = "md",
  className = "",
}) => {
  const handleChipClick = (value: string) => {
    if (!onChange) return;

    if (multiple) {
      const isSelected = selectedValues.includes(value);
      const newValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      onChange(newValues);
    } else {
      const isSelected = selectedValues.includes(value);
      onChange(isSelected ? [] : [value]);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {title && (
        <Text variant="body" weight="semibold" as="h2" className="text-xl">
          {title}
        </Text>
      )}

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <Chip
            key={option.id}
            size={size}
            isSelected={selectedValues.includes(option.value)}
            onClick={() => handleChipClick(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
};
