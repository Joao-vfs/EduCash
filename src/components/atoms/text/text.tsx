import { TextProps } from "./type";

export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant = "body",
  weight = "normal",
  className = "",
  children,
  ...props
}) => {
  const variantStyles = {
    body: "text-base text-text-white",
    caption: "text-sm text-text-gray",
    label: "text-sm font-medium text-black",
  };

  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  return (
    <Component
      className={`${variantStyles[variant]} ${weightStyles[weight]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
