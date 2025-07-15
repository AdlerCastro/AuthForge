import { Role } from '@/core/enum/role.enum';
import { UserMapper } from '@/domain/user/mappers/users';
import { CreateUserUseCase } from '@/domain/user/use-cases/createUser.case';
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
    const parsed = registerSchema.parse(req.body);

    const data = {
      ...parsed,
      role: Role[parsed.role],
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
      const { name, email, password } = updateSchema.parse(req.body);

      await userService.update(id, {
        name,
        email,
        password,
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
