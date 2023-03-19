import { FastifyRequest } from 'fastify';

export interface ITodoRequest extends FastifyRequest {
  ownerId: string;
  title: string;
  description: string;
  completed: boolean;
}
