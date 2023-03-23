import { FastifyRequest } from "fastify";

export interface IUserRequest extends FastifyRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Follow {
  followerId: string;
  followingId: string;
}
