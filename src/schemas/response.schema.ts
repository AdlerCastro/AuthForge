import { z } from 'zod';

export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string().optional(),
});
