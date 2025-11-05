import { ComponentProps } from "react";

export type EyeProps = ComponentProps<"svg"> & {
    open?: boolean; 
}; 