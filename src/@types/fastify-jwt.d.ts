import { User } from '@/types/user.type';
import { JWT } from 'fastify-jwt';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: import('fastify').RouteHandlerMethod;
  }
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: User;
  }
}
