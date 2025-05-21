import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerZodCompiler } from './utils/zodCompiler';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { userRoutes } from '@/routes/user.routes';
import { env } from './config/env.config';
import { adminRoutes } from './routes/admin.routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();

registerZodCompiler(app);

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'AuthForge API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(userRoutes, adminRoutes);

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running on http://localhost:3333');
});
