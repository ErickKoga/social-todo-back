import fastify from 'fastify';
import config from './config/config';

// Instantiate the Fastify Framework.
const server = fastify();

// Start the server on the assigned port.
server.listen({ port: config.API_PORT }, (err, address) => {
  // If any errors occur, throw it on the console and exit the process.
  if (err) {
    console.error(err);
    process.exit(1);
  }
  // If the server starts successfully, report the address and port on the console.
  console.log(`Server listening at ${address}`);
});
