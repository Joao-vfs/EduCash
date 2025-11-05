import { ComponentProps } from "react";

export type ArrowIconProps = ComponentProps<"svg"> & {
  direction?: "left" | "right" | "up" | "down";
  height?: number;
  width?: number;
};
