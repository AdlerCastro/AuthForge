import { UsersUseCase } from '@/domain/user/use-cases/users';
import { PrismaUserRepository } from '@/infra/database/prisma/user.repository';
import { FastifyReply, FastifyRequest } from 'fastify';

export const meController = {
  getMe: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const userUseCase = new UsersUseCase(new PrismaUserRepository());

      const user = await userUseCase.getById(req.user.id);

      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Usuário encontrado',
        data: user,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
