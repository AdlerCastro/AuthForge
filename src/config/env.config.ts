import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['production', 'development', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(3333),

  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}
export const env = _env.data;
