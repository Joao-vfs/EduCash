"use client";

import { forwardRef, useState } from "react";
import { InputProps } from "./type";
import { Eye } from "@/icons";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex items-center justify-between w-full py-3 px-6 h-14 border rounded-12px transition-colors bg-transparent border-text-gray text-text-white placeholder:text-white relative";

    const errorStyles = error
      ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400";

      const [passwordVisible, setPasswordVisible] = useState(false);

      const valuePasswordType = props.type === "password" ? (passwordVisible ? "text" : "password") : props.type;

    return (
      <div className="w-full">
        <div className={`${baseStyles} ${errorStyles} ${className}`}>
          <input
            ref={ref}
            {...props}
            type={valuePasswordType}
            className="w-full h-full bg-transparent border-none outline-none placeholder:text-text-white focus:outline-none"
          />
          {props.type === "password" && (
            <Eye
              className="text-text-gray cursor-pointer"
              open={passwordVisible}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          )}
        </div>
        {error && (
          <span className="mt-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
