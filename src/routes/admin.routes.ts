import { adminController } from '@/controllers/admin.controller';
import { checkRole } from '@/middleware/checkRole';
import { registerSchema } from '@/schemas/register.schema';
import {
  successResponseSchema,
  errorResponseSchema,
} from '@/schemas/response.schema';
import { updateSchema } from '@/schemas/update.schema';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';
import z from 'zod';

export async function adminRoutes(app: FastifyTypeInstance) {
  app.post(
    '/admin',
    {
      preHandler: [app.authenticate, checkRole('ADMIN')],
      schema: {
        description: 'Create a new user',
        tags: ['admin'],
        body: registerSchema,
        response: {
          201: successResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    adminController.create,
  );

  app.patch(
    '/admin/:id',
    {
      preHandler: [app.authenticate, checkRole('ADMIN')],
      schema: {
        description: 'Update a user',
        tags: ['admin'],
        params: z.object({
          id: z.string().describe('User ID'),
        }),
        body: updateSchema,
        response: {
          200: successResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    adminController.update,
  );

  app.delete(
    '/admin/:id',
    {
      preHandler: [app.authenticate, checkRole('ADMIN')],
      schema: {
        description: 'Delete a user',
        tags: ['admin'],
        params: z.object({
          id: z.string().describe('User ID'),
        }),
        response: {
          200: successResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    adminController.delete,
  );
}
