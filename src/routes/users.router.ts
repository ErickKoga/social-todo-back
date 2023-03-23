import { FastifyInstance } from "fastify";

import { UsersController } from "../controllers/users.controller";
import {
  createUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

export default async function usersRouter(server: FastifyInstance) {
  const usersController = new UsersController();

  server.route({
    method: "GET",
    url: "",
    schema: getAllUsersSchema,
    handler: usersController.getAllUsers.bind(usersController),
  });

  server.route({
    method: "GET",
    url: "/:id",
    schema: getUserSchema,
    handler: usersController.getUserById.bind(usersController),
  });

  server.route({
    method: "PATCH",
    url: "/:id",
    schema: updateUserSchema,
    handler: usersController.updateUser.bind(usersController),
  });

  server.route({
    method: "DELETE",
    url: "/:id",
    schema: deleteUserSchema,
    handler: usersController.deleteUser.bind(usersController),
  });

  server.route({
    method: "POST",
    url: "/follow",
    handler: usersController.follow.bind(usersController),
  });

  server.route({
    method: "DELETE",
    url: "/follow",
    handler: usersController.unfollow.bind(usersController),
  });
}
