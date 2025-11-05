import { IconButtonProps } from "./type";

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    default: "bg-text-gray text-text-white",
    primary: "bg-actions-blue text-white",
    secondary: "bg-white text-black",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
  };

  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

