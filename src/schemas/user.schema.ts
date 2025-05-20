import z from 'zod';

export const UserSchema = z
  .array(
    z.object({
      id: z.string().uuid().describe('User ID'),
      name: z
        .string()
        .min(3, 'The name is less than 3 letters')
        .describe('User name'),
      email: z.string().email().describe('User email'),
      password_hash: z.string().describe('User password hash'),
      created_at: z.date().describe('User creation date'), // <== ALTERADO
      role: z.enum(['USER', 'ADMIN']).default('USER').describe('User role'),
    }),
  )
  .describe('User');

export type UserSchemaType = z.infer<typeof UserSchema>;
