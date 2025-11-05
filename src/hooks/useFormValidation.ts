import { useState, useCallback } from "react";

export type ValidationRule<T = any> = {
  validator: (value: T, formValues?: any) => boolean;
  message: string;
};

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export type UseFormValidationOptions<T> = {
  schema: ValidationSchema<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

export function useFormValidation<T extends Record<string, any>>({
  schema,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormValidationOptions<T>) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (fieldName: keyof T, value: any, formValues?: T): string | undefined => {
      const rules = schema[fieldName];

      if (!rules) return undefined;

      for (const rule of rules) {
        if (!rule.validator(value, formValues)) {
          return rule.message;
        }
      }

      return undefined;
    },
    [schema]
  );

  const validate = useCallback(
    (values: T): boolean => {
      const newErrors: ValidationErrors<T> = {};
      let isValid = true;

      for (const fieldName in schema) {
        const error = validateField(fieldName, values[fieldName], values);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    [schema, validateField]
  );

  const validateSingleField = useCallback(
    (fieldName: keyof T, value: any, formValues?: T) => {
      const error = validateField(fieldName, value, formValues);

      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));

      return !error;
    },
    [validateField]
  );

  const touchField = useCallback((fieldName: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  const clearError = useCallback((fieldName: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetTouched = useCallback(() => {
    setTouched({});
  }, []);

  const handleChange = useCallback(
    (fieldName: keyof T, value: any, formValues?: T) => {
      if (validateOnChange || touched[fieldName]) {
        validateSingleField(fieldName, value, formValues);
      } else if (errors[fieldName]) {
        clearError(fieldName);
      }
    },
    [validateOnChange, touched, errors, validateSingleField, clearError]
  );

  const handleBlur = useCallback(
    (fieldName: keyof T, value: any, formValues?: T) => {
      touchField(fieldName);

      if (validateOnBlur) {
        validateSingleField(fieldName, value, formValues);
      }
    },
    [validateOnBlur, touchField, validateSingleField]
  );

  const hasErrors = Object.keys(errors).length > 0;

  const hasError = useCallback(
    (fieldName: keyof T): boolean => {
      return !!errors[fieldName];
    },
    [errors]
  );

  const getError = useCallback(
    (fieldName: keyof T): string | undefined => {
      return errors[fieldName];
    },
    [errors]
  );

  return {
    errors,
    touched,
    hasErrors,
    hasError,
    getError,
    validate,
    validateField,
    validateSingleField,
    clearError,
    clearErrors,
    touchField,
    resetTouched,
    handleChange,
    handleBlur,
  };
}
