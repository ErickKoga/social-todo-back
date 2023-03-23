import { PrismaClient, Follow } from "@prisma/client";

import { IFollowRequest } from "../interfaces/follow.interface";

const prisma: PrismaClient = new PrismaClient();

export class FollowsService {
  /**
   * Create a new follow.
   * @param newFollow contains all the data of the new follow.
   * @returns an instance of the new follow.
   */
  async createFollow(newFollow: IFollowRequest): Promise<Follow> {
    return await prisma.follow.create({
      data: newFollow,
    });
  }

  /**
   * Delete a follow from the database.
   * @param followId contains the ID in string format.
   */
  async deleteFollow(followId: string): Promise<void> {
    try {
      await prisma.follow.delete({
        where: { id: followId },
      });
    } catch (error: any) {
      throw error;
    }
  }
}
