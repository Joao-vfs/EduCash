import { ComponentProps } from "react";

export type ChipProps = ComponentProps<"button"> & {
  variant?: "default" | "selected";
  size?: "sm" | "md" | "lg";
  isSelected?: boolean;
  children: React.ReactNode;
}

