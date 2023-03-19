import { FastifyReply } from 'fastify';

// A helper to streamline the reply process.
export const replyContent = (
  reply: FastifyReply,
  statusCode: number,
  message: string
) => {
  return reply.status(statusCode).send({
    statusCode: statusCode,
    message: message,
  });
};
