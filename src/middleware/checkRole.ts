import { FastifyReply, FastifyRequest } from 'fastify';

export function checkRole(required: 'USER' | 'ADMIN') {
  return async function (req: FastifyRequest, res: FastifyReply) {
    if (req.user.role !== required) {
      return res.status(403).send({
        success: false,
        message: 'Acesso negado: privilégio insuficiente',
      });
    }
  };
}
