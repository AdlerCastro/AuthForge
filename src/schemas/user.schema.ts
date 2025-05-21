import z from 'zod';
import { registerSchema } from './register.schema';

export const UserSchema = registerSchema
  .merge(
    z.object({
      created_at: z.date().describe('User creation date'),
    }),
  )

  .describe('User');

export type UserSchemaType = z.infer<typeof UserSchema>;
