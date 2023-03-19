import { FastifyRequest } from 'fastify';

export interface IUserRequest extends FastifyRequest {
  name: string;
  email: string;
  password: string;
}
