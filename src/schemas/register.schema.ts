import z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'The name is less than 3 letters')
      .describe('User name'),
    email: z.string().email().describe('User email'),
    password_hash: z
      .string()
      .min(6, 'The password is less than 6 characters')
      .describe('User password hash'),
    role: z.enum(['USER', 'ADMIN']).default('USER').describe('User role'),
  })
  .describe('User created');

export type RegisterSchemaType = z.infer<typeof registerSchema>;
