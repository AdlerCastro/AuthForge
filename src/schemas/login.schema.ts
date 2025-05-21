import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email().describe('User email'),
  password: z
    .string()
    .min(6, 'The password is less than 6 characters')
    .describe('User password'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
