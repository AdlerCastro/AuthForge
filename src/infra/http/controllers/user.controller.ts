import { Role } from '@/core/enum/role.enum';
import { UserMapper } from '@/domain/user/mappers/users';
import { CreateUserUseCase } from '@/domain/user/use-cases/createUser.case';
import { UpdateUserUseCase } from '@/domain/user/use-cases/updateUser.case';
import { UsersUseCase } from '@/domain/user/use-cases/users';
import { BcryptHasher } from '@/infra/cryptography/bcrypt.hasher';
import { PrismaUserRepository } from '@/infra/database/prisma/user.repository';
import { registerSchema } from '@/schemas/register.schema';
import { updateSchema } from '@/schemas/update.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

export const userController = {
  getAll: async (_: FastifyRequest, res: FastifyReply) => {
    const usersUseCase = new UsersUseCase(new PrismaUserRepository());

    const users = await usersUseCase.getAll();
    const publicUsers = users.map((user) => UserMapper.toDTO(user));

    res.status(200).send(publicUsers);
  },

  getById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    try {
      const usersUseCase = new UsersUseCase(new PrismaUserRepository());
      const user = await usersUseCase.getById(id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      const publicUser = UserMapper.toDTO(user);

      return res.status(200).send(publicUser);
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },

  create: async (req: FastifyRequest, res: FastifyReply) => {
    const parsedData = registerSchema.parse(req.body);

    const data = {
      ...parsedData,
      role: Role[parsedData.role],
    };
    try {
      const createUserUseCase = new CreateUserUseCase(
        new PrismaUserRepository(),
        new BcryptHasher(),
      );

      await createUserUseCase.execute(data);

      return res.status(201).send({
        success: true,
        message: 'Usuário criado com sucesso',
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao criar o usuário',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },

  update: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };

    const authUser = req.user;

    if (authUser.role !== 'ADMIN' && authUser.id !== id) {
      return res.status(403).send({
        success: false,
        message: 'Você não tem permissão para editar este usuário.',
      });
    }

    try {
      const parsedBody = updateSchema.parse(req.body);
      const body = {
        ...parsedBody,
        role: parsedBody.role !== undefined ? Role[parsedBody.role] : undefined,
      };

      const updateUserUseCase = new UpdateUserUseCase(
        new PrismaUserRepository(),
        new BcryptHasher(),
      );

      await updateUserUseCase.execute({
        id,
        ...body,
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
