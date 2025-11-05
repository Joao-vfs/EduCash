import { ComponentProps, ReactNode } from "react";

export type CardProps = ComponentProps<"div"> & {
  variant?: "default" | "primary" | "secondary" | "gradient";
  children: ReactNode;
}

