import fastify, { FastifyInstance } from 'fastify';
import envConfig from './config/env.config';
import usersRouter from './routes/users.router';

// Instantiate the Fastify Framework.
const server: FastifyInstance = fastify();

// Routes
server.register(usersRouter, { prefix: 'users' });

// Health check
server.get('/', async (_request, reply) => {
  reply.status(200).send({ status: 'ok' });
});

// Start the server on the assigned port.
server.listen(
  { port: envConfig.API_PORT, host: envConfig.API_HOST },
  (err, address) => {
    // If any errors occur, throw it on the console and exit the process.
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // If the server starts successfully, report the address and port on the console.
    console.log(`Server listening at ${address}`);
  }
);
