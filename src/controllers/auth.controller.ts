import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { replyContent } from '../helpers/reply-content';
import { AuthService } from '../services/auth.service';
import { IUserRequest } from '../interfaces/user.interface';
import { ICredentials } from '../interfaces/credentials.interface';

export class AuthController {
  private authService: AuthService;
  private server: FastifyInstance;

  constructor(server: FastifyInstance) {
    this.authService = new AuthService();
    this.server = server;
  }

  /**
   * This is a controller method that authenticates an user, given the credentials specified in the interface.
   * @param request contains the incoming HTTP request, which includes the Idata specified in the interface in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async authenticate(
    request: FastifyRequest<{
      Body: ICredentials;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const credentials: ICredentials = request.body;
      const accessToken = await this.authService.authenticate(
        this.server,
        credentials
      );
      if (!accessToken) {
        replyContent(reply, 404, 'Invalid email or password.');
      }
      reply.status(201).send(accessToken);
      return;
    } catch (error: any) {
      // If the user is not found, throw an error.
      if (error.code && error.code === 'P2025') {
        console.error(error);
        replyContent(reply, 404, `Invalid email or password.`);
      }
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, 'Internal server exception.');
    }
  }

  /**
   * This is a controller method that creates an user, given the data specified in the interface.
   * @param request contains the incoming HTTP request, which includes the Idata specified in the interface in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async register(
    request: FastifyRequest<{
      Body: IUserRequest;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const newUser: IUserRequest = request.body;
      const accessToken = await this.authService.register(this.server, newUser);
      reply.status(201).send(accessToken);
      return;
    } catch (error: any) {
      // If the email is already registered, throw an error.
      if (error.code && error.code === 'P2002') {
        console.error(error);
        replyContent(reply, 409, `User e-mail already registered.`);
      }
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, 'Internal server exception.');
    }
  }
}
