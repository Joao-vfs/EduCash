import { ComponentProps, ReactNode } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "outline-secondary" | "test" | "back";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  children: ReactNode;
}
