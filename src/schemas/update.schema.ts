import z from 'zod';

export const updateSchema = z
  .object({
    name: z
      .string()
      .min(3, 'The name is less than 3 letters')
      .optional()
      .describe('User name'),
    email: z.string().email().describe('User email').optional(),
    password: z
      .string()
      .min(6, 'The password is less than 6 characters')
      .describe('User password hash')
      .optional(),
    role: z
      .enum(['USER', 'ADMIN'])
      .default('USER')
      .describe('User role')
      .optional(),

    RG: z
      .string()
      .min(6, 'The RG is less than 6 characters')
      .max(6, 'The RG is more than 6 characters')
      .optional()
      .describe('User RG'),
    phone: z.string().optional().describe('User phone'),
    address: z.string().optional().describe('User address'),
    birth_date: z.coerce.date().optional().describe('User birth date'),
  })
  .describe('User created');

export type UpdateSchemaType = z.infer<typeof updateSchema>;
