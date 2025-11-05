import { ChipProps } from "./type";

export const Chip: React.FC<ChipProps> = ({
  variant = "default",
  size = "md",
  isSelected = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-normal transition-all rounded-full border disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    default: "bg-transparent border-actions-blue text-text-gray hover:bg-actions-blue/10",
    selected: "bg-blue border-blue text-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const currentVariant = isSelected ? "selected" : variant;

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[currentVariant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

