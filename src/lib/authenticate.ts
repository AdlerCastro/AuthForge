import { FastifyJWT } from '@fastify/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function Authenticate(req: FastifyRequest, res: FastifyReply) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'Token não encontrado',
    });
  }
  try {
    const decoded = req.jwt.verify<FastifyJWT['user']>(token);
    req.user = decoded;
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: 'Token inválido. Error ' + error });
  }
}
