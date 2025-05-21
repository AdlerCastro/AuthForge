import { FastifyTypeInstance } from '@/types/fastifyInstance.type';
import { userController } from '@/controllers/user.controller';
import { UserSchema } from '@/schemas/user.schema';
import {
  errorResponseSchema,
  successResponseSchema,
} from '@/schemas/response.schema';
import z from 'zod';
import { updateSchema } from '@/schemas/update.schema';

export async function userRoutes(app: FastifyTypeInstance) {
  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Get all users',
        response: {
          200: z.array(UserSchema).describe('List of users'),
        },
      },
    },
    userController.getAll,
  );

  app.get(
    '/users/:id',
    {
      schema: {
        description: 'Get a user by ID',
        tags: ['users'],
        params: z.object({
          id: z.string().describe('User ID'),
        }),
        response: {
          200: UserSchema,
          400: errorResponseSchema,
        },
      },
    },
    userController.getById,
  );

  app.patch(
    '/users/:id',
    {
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
    userController.update,
  );
}
