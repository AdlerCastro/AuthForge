import { loginController } from '@/controllers/login.controller';
import { loginSchema } from '@/schemas/login.schema';
import { errorResponseSchema } from '@/schemas/response.schema';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';
import z from 'zod';

export async function loginRoute(app: FastifyTypeInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: ['login'],
        description: 'Login user',
        body: loginSchema,
        response: {
          201: z
            .object({
              accessToken: z.string().describe('Access token'),
            })
            .describe('Login success'),
          401: errorResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    loginController.login,
  );
}
