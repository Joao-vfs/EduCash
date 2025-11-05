import { ButtonProps } from "./type";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center text-sm leading-7 h-14 justify-center font-medium transition-colors rounded-12px disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    primary: "bg-blue",
    outline: "bg-transparent border border-actions-blue text-text-gray",
    "outline-secondary": "bg-transparent border-2 border-blue text-white",
    back: "bg-actions-blue rounded-full",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 w-full",
    md: "px-4 py-2 w-full",
    lg: "p-2.5 w-full",
    icon: "p-2.5 size-36px!",
  };

  if (variant === "test") {
    return (
      <button
        className={`flex items-center justify-start relative z-10 font-bold ${className}`}
      >
        <span className="absolute bg-blue size-20 rounded-full z-0" />
        <span className="relative z-10 ml-10">{children}</span>
      </button>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2">⏳</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
