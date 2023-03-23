import { FastifyRequest } from "fastify";

export interface IFollowRequest extends FastifyRequest {
  id: string;
  followerId: string;
  followingId: string;
}
