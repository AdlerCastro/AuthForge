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
import fastifyJwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import { Authenticate } from './middleware/authenticate';
import { loginRoute } from './routes/login.route';
import { logoutRoute } from './routes/logout.route';
import { meRoute } from './routes/me.route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

registerZodCompiler(app);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(fCookie, {
  secret: env.COOKIE_SECRET,
  hook: 'preHandler',
});

app.decorate('authenticate', Authenticate);

app.register(fastifyCors, {
  origin: [env.FRONTEND_URL],
  credentials: true,
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

app.register(userRoutes);
app.register(adminRoutes);
app.register(loginRoute);
app.register(logoutRoute);
app.register(meRoute);

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running on port: ${env.PORT}`);
});
