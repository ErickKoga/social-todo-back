import { PrismaClient, User } from '@prisma/client';

import { IUserRequest } from '../interfaces/user.interface';

const prisma: PrismaClient = new PrismaClient();

export class UsersService {
  /**
   * Create a new user.
   * @param name contains the name of the new user.
   * @returns an instance of the new user.
   */
  async createUser(newUser: IUserRequest): Promise<Partial<User>> {
    const user: Partial<User> = await prisma.user.create({
      data: newUser,
    });
    const { password, ...filteredUser } = user;
    return filteredUser;
  }

  /**
   * List all the users in the database.
   * @returns an array containing all the users.
   */
  async getAllUsers(): Promise<Partial<User>[]> {
    return await prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  /**
   * Read a specific user by it's ID.
   * @param userId contains the ID in string format.
   * @returns a user instance, or null if no user is found.
   */
  async getUserById(userId: string): Promise<Partial<User> | null> {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });
    } catch (error: any) {
      console.error(`Error fetching user with id ${userId}: ${error}`);
      return null;
    }
  }

  /**
   * Update a user's values using it's ID.
   * @param userId contains the ID in string format.
   * @param userRequest contains all the information that can be changed.
   * @returns a user instance or null.
   */
  async updateUser(
    userId: string,
    userRequest: IUserRequest
  ): Promise<Partial<User> | null> {
    await prisma.user.update({
      where: { id: userId },
      data: userRequest,
    });
    return await this.getUserById(userId);
  }

  /**
   * Delete a user from the database.
   * @param userId contains the ID in string format.
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { deletedAt: new Date() },
      });
    } catch (error: any) {
      throw error;
    }
  }
}
