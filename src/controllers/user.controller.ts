import { updateSchema } from '@/schemas/update.schema';
import { userService } from '@/services/user.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const userController = {
  getAll: async (req: FastifyRequest, res: FastifyReply) => {
    const users = await userService.getAll();
    res.status(200).send(users);
  },

  getById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    try {
      const user = await userService.getById(id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },

  update: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    try {
      const { name, email, password_hash } = updateSchema.parse(req.body);

      await userService.update(id, {
        name,
        email,
        password_hash,
      });

      return res.status(201).send({
        success: true,
        message: 'Usuário atualizado com sucesso',
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao atualizar o usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
