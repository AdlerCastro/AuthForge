import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod';

import type { FastifyInstance } from 'fastify';

export const registerZodCompiler = (app: FastifyInstance) => {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
};
