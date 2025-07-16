import { Role } from '@/core/enum/role.enum';
import { CreateUserUseCase } from '@/domain/user/use-cases/createUser.case';
import { DeleteUserUseCase } from '@/domain/user/use-cases/deleteUser.case';
import { UpdateUserUseCase } from '@/domain/user/use-cases/updateUser.case';
import { BcryptHasher } from '@/infra/cryptography/bcrypt.hasher';
import { PrismaUserRepository } from '@/infra/database/prisma/user.repository';
import { registerSchema } from '@/schemas/register.schema';
import { updateSchema } from '@/schemas/update.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adminController = {
  create: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const parsedData = registerSchema.parse(req.body);

      const data = {
        ...parsedData,
        role: Role[parsedData.role],
      };

      const createUsesUseCase = new CreateUserUseCase(
        new PrismaUserRepository(),
        new BcryptHasher(),
      );

      await createUsesUseCase.execute(data);

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
      const parsedData = updateSchema.parse(req.body);
      const data = {
        ...parsedData,
        role: parsedData.role !== undefined ? Role[parsedData.role] : undefined,
      };

      const updateUserUseCase = new UpdateUserUseCase(
        new PrismaUserRepository(),
        new BcryptHasher(),
      );

      await updateUserUseCase.execute({
        id,
        ...data,
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

  delete: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'ID do usuário não informado',
      });
    }

    try {
      const deleteUserUseCase = new DeleteUserUseCase(
        new PrismaUserRepository(),
      );

      await deleteUserUseCase.execute(id);

      return res.status(200).send({
        success: true,
        message: 'Usuário deletado',
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao deletar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
