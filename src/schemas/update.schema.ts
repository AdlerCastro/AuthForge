import z from 'zod';

export const updateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'The name is less than 3 letters')
      .optional()
      .describe('User name'),
    email: z.string().email().describe('User email').optional(),
    password_hash: z.string().describe('User password hash').optional(),
    role: z
      .enum(['USER', 'ADMIN'])
      .default('USER')
      .describe('User role')
      .optional(),
  })
  .describe('User created');

export type UpdateSchemaType = z.infer<typeof updateSchema>;
