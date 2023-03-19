import { FastifyInstance } from 'fastify';

import { UsersController } from '../controllers/users.controller';
import {
  createUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';

async function usersRouter(fastify: FastifyInstance) {
  const usersController = new UsersController();

  fastify.route({
    method: 'POST',
    url: '',
    schema: createUserSchema,
    handler: usersController.createUser.bind(usersController),
  });

  fastify.route({
    method: 'GET',
    url: '',
    schema: getAllUsersSchema,
    handler: usersController.getAllUsers.bind(usersController),
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getUserSchema,
    handler: usersController.getUserById.bind(usersController),
  });

  fastify.route({
    method: 'PATCH',
    url: '/:id',
    schema: updateUserSchema,
    handler: usersController.updateUser.bind(usersController),
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: deleteUserSchema,
    handler: usersController.deleteUser.bind(usersController),
  });
}

export default usersRouter;
