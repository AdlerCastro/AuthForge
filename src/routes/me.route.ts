import { meController } from '@/controllers/me.controller';
import { errorResponseSchema } from '@/schemas/response.schema';
import { UserSchema } from '@/schemas/user.schema';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';

export async function meRoute(app: FastifyTypeInstance) {
  app.get(
    '/me',
    {
      schema: {
        tags: ['me'],
        description: 'Get current user',
        response: {
          200: UserSchema.omit({ password_hash: true }).describe(
            'Get current user success',
          ),
          401: errorResponseSchema,
        },
      },
    },
    meController.getMe,
  );
}
