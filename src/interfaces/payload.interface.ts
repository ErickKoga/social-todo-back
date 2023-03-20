import { FastifyRequest } from 'fastify';

export interface IPayload extends FastifyRequest {
  id: string;
}
