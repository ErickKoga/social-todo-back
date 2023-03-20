import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'crypto';
import { FastifyInstance } from 'fastify';

import envConfig from '../config/env.config';
import { IUserRequest } from '../interfaces/user.interface';
import { ICredentials } from '../interfaces/credentials.interface';
import { IPayload } from '../interfaces/payload.interface';

const prisma: PrismaClient = new PrismaClient();

export class AuthService {
  /**
   * Register a new user.
   * @param newUser contains all the data of the new user.
   * @returns the new user's JWT token.
   */
  async register(
    server: FastifyInstance,
    newUser: IUserRequest
  ): Promise<{ accessToken: string }> {
    // Destructuring interface.
    const { name, email, password } = newUser;
    // Hashing password with a random salt.
    const hashedPassword = await hash(password, 10);

    // Insert the new user in the database.
    const user: Partial<User> = await prisma.user.create({
      data: {
        // Name to proper case.
        name: name.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }),
        // Email always as lowercase.
        email: email.toLowerCase(),
        // Password hashed by bcrypt.
        password: hashedPassword,
      },
    });

    const token = server.jwt.sign({ id: user.id } as IPayload);
    return { accessToken: token };
  }

  /**
   * Authenticate a user.
   * @param credentials contains the user's email and password.
   * @returns the user's JWT token.
   */
  async authenticate(
    server: FastifyInstance,
    credentials: ICredentials
  ): Promise<{ accessToken: string } | null> {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    if (!(await compare(password, user.password))) {
      return null;
    }

    const token = server.jwt.sign({ id: user.id } as IPayload);

    return { accessToken: token };
  }
}
