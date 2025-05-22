import { loginSchema } from '@/schemas/login.schema';
import { loginService } from '@/services/login.service';
import { User } from '@/types/user.type';

import { FastifyReply, FastifyRequest } from 'fastify';

export const loginController = {
  login: async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await loginService.getByEmail({ email });
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      const isPasswordValid = await loginService.comparePassword(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        return res.status(401).send({
          success: false,
          message: 'Senha inválida',
        });
      }

      const payload: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = req.jwt.sign(payload);

      return res
        .status(201)
        .setCookie('access_token', token, {
          path: '/',
          httpOnly: true,
          secure: true,
        })
        .send({
          accessToken: token,
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
