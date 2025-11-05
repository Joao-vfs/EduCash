import { HTMLAttributes, ReactNode } from "react";

export type TextProps = HTMLAttributes<HTMLElement> & {
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    variant?: 'body' | 'caption' | 'label';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    children: ReactNode;
  }
  