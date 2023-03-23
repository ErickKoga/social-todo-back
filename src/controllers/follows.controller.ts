import { Follow } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import { replyContent } from "../helpers/reply-content";
import { IFollowRequest } from "../interfaces/follow.interface";
import { FollowsService } from "../services/follows.service";

export class FollowsController {
  private followsService: FollowsService;

  constructor() {
    this.followsService = new FollowsService();
  }
  public async createFollow(
    request: FastifyRequest<{
      Body: IFollowRequest;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const newFollow: IFollowRequest = request.body;
      const follow: Follow = await this.followsService.createFollow(newFollow);
      reply.status(200).send(follow);
      return;
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that deletes a follow, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the follow to delete in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async deleteFollow(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      await this.followsService.deleteFollow(request.params.id);
      // Return a success.
      replyContent(
        reply,
        200,
        `Follow with ID ${request.params.id} successfully deleted.`
      );
    } catch (error: any) {
      // If a follow is not found, return a not found exception.
      if (error.code && error.code === "P2025") {
        console.error(error);
        replyContent(
          reply,
          404,
          `Follow with ID ${request.params.id} not found.`
        );
      }
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }
}
