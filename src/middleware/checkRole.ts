import { FastifyReply, FastifyRequest } from 'fastify';

export function checkRole(required: 'USER' | 'ADMIN') {
  return async function (req: FastifyRequest, res: FastifyReply) {
    if (req.user.role === 'USER') {
      return res.status(403).send({
        success: true,
        message: 'Acesso negado. Privilégios insuficientes',
      });
    }

    if (req.user.role !== required) {
      return res.status(403).send({
        success: false,
        message: 'Você não é usuário ou administrador',
      });
    }
  };
}
