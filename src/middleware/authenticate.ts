import { FastifyReply, FastifyRequest } from 'fastify';

export async function Authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Token não encontrado',
      });
    }

    const decoded = req.jwt.verify(token);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: `Token inválido ou expirado. Error: ${error}`,
    });
  }
}
