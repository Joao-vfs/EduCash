import { ComponentProps } from "react";

export type ChevronProps = ComponentProps<"svg"> & {
    direction?: "left" | "right" | "up" | "down";
    size?: number;
};