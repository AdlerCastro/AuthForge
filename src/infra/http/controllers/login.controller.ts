import { UserPayload } from '@/core/types/userPayload';
import { LoginUseCase } from '@/domain/user/use-cases/login.case';
import { env } from '@/infra/config/env.config';
import { BcryptHasher } from '@/infra/cryptography/bcrypt.hasher';
import { PrismaUserRepository } from '@/infra/database/prisma/user.repository';
import { loginSchema } from '@/schemas/login.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

export const loginController = {
  login: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const loginUseCase = new LoginUseCase(
        new PrismaUserRepository(),
        new BcryptHasher(),
      );

      const { user } = await loginUseCase.execute({ email, password });

      const UserPayloaded: UserPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = req.jwt.sign(UserPayloaded);

      return res
        .status(201)
        .setCookie('access_token', token, {
          path: '/',
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
        .send({
          success: true,
          message: 'Login realizado com sucesso',
        });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Erro ao fazer login',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
