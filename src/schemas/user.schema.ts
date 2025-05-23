import z from 'zod';
import { registerSchema } from './register.schema';

export const UserSchema = registerSchema
  .merge(
    z.object({
      id: z.string().uuid().describe('User ID'),
      created_at: z.date().describe('User creation date'),
    }),
  )

  .describe('User');

export type UserSchemaType = z.infer<typeof UserSchema>;

export const PublicUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
  RG: z.string(),
  phone: z.string(),
  address: z.string(),
  birth_date: z.date(),
  created_at: z.date(),
});

export const PublicUserArraySchema = z.array(PublicUserSchema);

export const PublicUserResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: PublicUserSchema,
});
