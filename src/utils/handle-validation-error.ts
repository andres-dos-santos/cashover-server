import type { z } from 'zod';

export function handleValidationError(errors: z.ZodIssue[]) {
  const error = errors[0];

  return `[${error.path}] - ${error.message}`;
}
