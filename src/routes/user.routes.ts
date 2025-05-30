import { FastifyTypeInstance } from '@/types/fastifyInstance.type';
import { userController } from '@/controllers/user.controller';
import { PublicUserArraySchema, PublicUserSchema } from '@/schemas/user.schema';
import {
  errorResponseSchema,
  successResponseSchema,
} from '@/schemas/response.schema';
import z from 'zod';
import { updateSchema } from '@/schemas/update.schema';
import { registerSchema } from '@/schemas/register.schema';

export async function userRoutes(app: FastifyTypeInstance) {
  app.get(
    '/users',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['users'],
        description: 'Get all users',
        response: {
          200: PublicUserArraySchema.describe('List of users'),
        },
      },
    },
    userController.getAll,
  );

  app.get(
    '/users/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        description: 'Get a user by ID',
        tags: ['users'],
        params: z.object({
          id: z.string().describe('User ID'),
        }),
        response: {
          200: PublicUserSchema.describe('User'),
          400: errorResponseSchema,
        },
      },
    },
    userController.getById,
  );

  app.patch(
    '/users/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        description: 'Update a user',
        tags: ['users'],
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

  app.post(
    '/register',
    {
      schema: {
        description: 'Sign up a new user',
        tags: ['sign-up'],
        body: registerSchema,
        response: {
          201: successResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    userController.create,
  );
}
