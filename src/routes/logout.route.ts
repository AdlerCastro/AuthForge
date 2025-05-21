import { logoutController } from '@/controllers/logout.controller';
import { FastifyTypeInstance } from '@/types/fastifyInstance.type';

export async function logoutRoute(app: FastifyTypeInstance) {
  app.delete(
    '/logout',
    { preHandler: [app.authenticate] },
    logoutController.logout,
  );
}
