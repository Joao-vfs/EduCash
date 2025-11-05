import { ComponentProps } from "react";

export type CreditCardIconProps = ComponentProps<"svg"> & {
  className?: string;
  size?: number;
}