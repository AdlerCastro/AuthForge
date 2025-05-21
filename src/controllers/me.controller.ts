import { userService } from '@/services/user.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const meController = {
  getMe: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const user = userService.getById(req.user.id);

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
