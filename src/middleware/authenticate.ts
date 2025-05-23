import { FastifyReply, FastifyRequest } from 'fastify';

export async function Authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    // Primeiro tenta pegar do cookie
    let token = req.cookies.access_token;

    // Se não tiver no cookie, tenta pegar do header
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

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
