export type ChipOption = {
  id: string;
  label: string;
  value: string;
};

export type ChipGroupProps = {
  title?: string;
  options: ChipOption[];
  selectedValues?: string[];
  onChange?: (selectedValues: string[]) => void;
  multiple?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};
