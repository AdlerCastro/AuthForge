import { logoutController } from '@/controllers/logout.controller';
import {
  errorResponseSchema,
  successResponseSchema,
} from '@/schemas/response.schema';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';

export async function logoutRoute(app: FastifyTypeInstance) {
  app.delete(
    '/logout',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['logout'],
        description: 'Logout user',
        response: {
          200: successResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    logoutController.logout,
  );
}
