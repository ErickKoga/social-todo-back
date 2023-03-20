import { FastifyInstance } from 'fastify';

import { AuthController } from '../controllers/auth.controller';
import { authenticateSchema, registerSchema } from '../schemas/auth.schema';

export default async function authRouter(server: FastifyInstance) {
  const authController = new AuthController(server);

  server.route({
    method: 'POST',
    url: '',
    schema: authenticateSchema,
    handler: authController.authenticate.bind(authController),
  });

  server.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: authController.register.bind(authController),
  });
}
