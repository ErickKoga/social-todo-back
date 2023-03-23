import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import { replyContent } from "../helpers/reply-content";
import { IUserRequest } from "../interfaces/user.interface";
import { UsersService } from "../services/users.service";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  /**
   * This is a controller method that reads all users.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async getAllUsers(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const users: Partial<User>[] = await this.usersService.getAllUsers();
      reply.status(200).send(users);
      return;
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that reads a user, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the user to read in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async getUserById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const user: Partial<User> | null = await this.usersService.getUserById(
        request.params.id
      );

      if (!user) {
        replyContent(reply, 404, "User not found.");
        return;
      }

      reply.status(200).send(user);
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that updates a user, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the user to update in the URL parameters and the data to be replaced in the URL body.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async updateUser(
    request: FastifyRequest<{ Params: { id: string }; Body: IUserRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      // Try to update the user.
      const user: Partial<User> | null = await this.usersService.updateUser(
        request.params.id,
        request.body
      );
      // If it does not find a match, return with a not found exception.
      if (!user) {
        replyContent(reply, 404, "User not found.");
        return;
      }
      // Return success, and an instance of the updated user.
      reply.status(200).send(user);
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that deletes a user, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the user to delete in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async deleteUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      await this.usersService.deleteUser(request.params.id);
      // Return a success.
      replyContent(
        reply,
        200,
        `User with ID ${request.params.id} successfully deleted.`
      );
    } catch (error: any) {
      // If a user is not found, return a not found exception.
      if (error.code && error.code === "P2025") {
        console.error(error);
        replyContent(
          reply,
          404,
          `User with ID ${request.params.id} not found.`
        );
      }
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  public async follow(
    request: FastifyRequest<{
      Body: { followerId: string; followingId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { followerId, followingId } = request.body;
      await this.usersService.followUser(followerId, followingId);
      reply.status(200);
      return;
    } catch (error: any) {
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  public async unfollow(
    request: FastifyRequest<{
      Body: { followerId: string; followingId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { followerId, followingId } = request.body;
      await this.usersService.unfollowUser(followerId, followingId);
      reply.status(200);
      return;
    } catch (error: any) {
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }
}
