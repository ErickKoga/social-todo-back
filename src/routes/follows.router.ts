import { FastifyInstance } from "fastify";
import { FollowsController } from "../controllers/follows.controller";
import {
  createFollowSchema,
  deleteFollowSchema,
} from "../schemas/follow.schema";

export default async function followsRouter(server: FastifyInstance) {
  const followsController = new FollowsController();

  server.route({
    method: "POST",
    url: "",
    schema: createFollowSchema,
    handler: followsController.createFollow.bind(followsController),
  });

  server.route({
    method: "DELETE",
    url: "/:id",
    schema: deleteFollowSchema,
    handler: followsController.deleteFollow.bind(followsController),
  });
}
