import { registerSchema } from '@/schemas/register.schema';
import { updateSchema } from '@/schemas/update.schema';
import { adminService } from '@/services/admin.service';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adminController = {
  create: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { name, email, password_hash, role } = registerSchema.parse(
        req.body,
      );

      await adminService.create({
        name,
        email,
        password_hash,
        role,
      });

      return res.status(201).send({
        success: true,
        message: 'Usuário criado',
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao criar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },

  update: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'ID do usuário não informado',
      });
    }

    try {
      const { name, email, password_hash, role } = updateSchema.parse(req.body);

      await adminService.update(id, {
        name,
        email,
        password_hash,
        role,
      });

      return res.status(200).send({
        success: true,
        message: 'Usuário atualizado',
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao atualizar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
