import { loginController } from '@/controllers/login.controller';
import { loginSchema } from '@/schemas/login.schema';
import {
  errorResponseSchema,
  successResponseSchema,
} from '@/schemas/response.schema';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';

export async function loginRoute(app: FastifyTypeInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: ['login'],
        description: 'Login user',
        body: loginSchema,
        response: {
          201: successResponseSchema,
          401: errorResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    loginController.login,
  );
}
