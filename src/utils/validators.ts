/**
 * Validador de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validador de senha forte
 */
export function isStrongPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Validador de campo obrigatório
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validador de tamanho mínimo
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validador de tamanho máximo
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

