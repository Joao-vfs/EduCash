import { CardProps } from "./type";

export const Card: React.FC<CardProps> = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-xl p-6";
  
  const variantStyles = {
    default: "bg-card-blue",
    primary: "bg-blue",
    secondary: "bg-actions-blue",
    gradient: "bg-card-gradient rounded-36px!",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

