import { FastifyRequest } from 'fastify';

export interface ICredentials extends FastifyRequest {
  email: string;
  password: string;
}
