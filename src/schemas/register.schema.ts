import z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'The name is less than 3 letters')
      .describe('User name'),
    email: z.string().email().describe('User email'),
    password: z
      .string()
      .min(6, 'The password is less than 6 characters')
      .describe('User password hash'),
    role: z.enum(['USER', 'ADMIN']).default('USER').describe('User role'),
    RG: z
      .string()
      .min(6, 'The RG is less than 6 characters')
      .max(6, 'The RG is more than 6 characters')
      .describe('User RG'),
    phone: z.string().describe('User phone'),
    address: z.string().describe('User address'),
    birth_date: z.coerce.date().describe('User birth date'),
  })
  .describe('User created');

export type RegisterSchemaType = z.infer<typeof registerSchema>;
