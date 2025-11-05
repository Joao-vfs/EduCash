import { ComponentProps, ReactNode } from "react";

export type IconButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

