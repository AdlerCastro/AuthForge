import { FastifyRequest, FastifyReply } from 'fastify';

export const logoutController = {
  logout: async (req: FastifyRequest, res: FastifyReply) => {
    res.clearCookie('access_token');

    return res.status(200).send({
      success: true,
      message: 'Logout successful',
    });
  },
};
