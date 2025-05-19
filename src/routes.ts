import z from 'zod';
import { FastifyTypeInstance } from './types/types';
import { randomUUID } from 'node:crypto';
import { User } from './types/user';

const users: User[] = [];

export async function routes(app: FastifyTypeInstance) {
  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Get all users',
        response: {
          200: z.array(
            z
              .object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
              })
              .describe('Users'),
          ),
        },
      },
    },
    () => {
      return users;
    },
  );

  app.get(
    '/users/:id',
    {
      schema: {
        tags: ['users'],
        description: 'Get a user by ID',
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
            })
            .describe('User'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const user = users.find((user) => user.id === id);

      if (!user) {
        return reply.status(404);
      }

      return reply.status(200).send(user);
    },
  );

  app.post(
    '/users',
    {
      schema: {
        description: 'Create a new user',
        tags: ['users'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({}).describe('User created'),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      users.push({
        id: randomUUID(),
        name,
        email,
      });

      return reply.status(201).send({});
    },
  );
}
