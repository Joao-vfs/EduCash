import { ValidationRule } from '@/hooks/useFormValidation';
import { isValidEmail, isStrongPassword, isRequired, minLength, maxLength } from './validators';

/**
 * Regra de validação para campo obrigatório
 */
export const required = (message = 'Campo obrigatório'): ValidationRule<string> => ({
  validator: isRequired,
  message,
});

/**
 * Regra de validação para email
 */
export const email = (message = 'Email inválido'): ValidationRule<string> => ({
  validator: isValidEmail,
  message,
});

/**
 * Regra de validação para senha forte
 */
export const strongPassword = (message = 'Senha deve ter no mínimo 8 caracteres'): ValidationRule<string> => ({
  validator: isStrongPassword,
  message,
});

/**
 * Regra de validação para tamanho mínimo
 */
export const min = (length: number, message?: string): ValidationRule<string> => ({
  validator: (value) => minLength(value, length),
  message: message || `Deve ter no mínimo ${length} caracteres`,
});

/**
 * Regra de validação para tamanho máximo
 */
export const max = (length: number, message?: string): ValidationRule<string> => ({
  validator: (value) => maxLength(value, length),
  message: message || `Deve ter no máximo ${length} caracteres`,
});

/**
 * Regra de validação customizada
 */
export const custom = <T = any>(
  validator: (value: T, formValues?: any) => boolean,
  message: string
): ValidationRule<T> => ({
  validator,
  message,
});

/**
 * Regra de validação para confirmar senha
 */
export const confirmPassword = (message = 'As senhas não coincidem'): ValidationRule<string> => ({
  validator: (value, formValues) => {
    return value === formValues?.password;
  },
  message,
});

/**
 * Regra de validação para número
 */
export const number = (message = 'Deve ser um número'): ValidationRule<string> => ({
  validator: (value) => !isNaN(Number(value)),
  message,
});

/**
 * Regra de validação para número positivo
 */
export const positiveNumber = (message = 'Deve ser um número positivo'): ValidationRule<string> => ({
  validator: (value) => !isNaN(Number(value)) && Number(value) > 0,
  message,
});

/**
 * Regra de validação para padrão regex
 */
export const pattern = (regex: RegExp, message: string): ValidationRule<string> => ({
  validator: (value) => regex.test(value),
  message,
});

