import { PrismaClient, Todo } from '@prisma/client';

import { ITodoRequest } from '../interfaces/todo.interface';

const prisma: PrismaClient = new PrismaClient();

export class TodoService {
  /**
   * Create a new todo.
   * @param newTodo contains all the data of the new todo.
   * @returns an instance of the new todo.
   */
  async createTodo(newTodo: ITodoRequest): Promise<Todo> {
    return await prisma.todo.create({
      data: newTodo,
    });
  }

  /**
   * List all the todo in the database.
   * @returns an array containing all the todo.
   */
  async getAllTodo(): Promise<Todo[]> {
    return await prisma.todo.findMany({
      where: { deletedAt: null },
    });
  }

  /**
   * Read a specific todo by it's ID.
   * @param todoId contains the ID in string format.
   * @returns a todo instance, or null if no todo is found.
   */
  async getTodoById(todoId: string): Promise<Todo | null> {
    try {
      return await prisma.todo.findUnique({
        where: { id: todoId },
      });
    } catch (error: any) {
      console.error(`Error fetching todo with id ${todoId}: ${error}`);
      return null;
    }
  }

  /**
   * Update a todo's values using it's ID.
   * @param todoId contains the ID in string format.
   * @param todoRequest contains all the information that can be changed.
   * @returns a todo instance or null.
   */
  async updateTodo(
    todoId: string,
    todoRequest: ITodoRequest
  ): Promise<Todo | null> {
    await prisma.todo.update({
      where: { id: todoId },
      data: todoRequest,
    });
    return await this.getTodoById(todoId);
  }

  /**
   * Delete a todo from the database.
   * @param todoId contains the ID in string format.
   */
  async deleteTodo(todoId: string): Promise<void> {
    try {
      await prisma.todo.update({
        where: { id: todoId },
        data: { deletedAt: new Date() },
      });
    } catch (error: any) {
      throw error;
    }
  }
}
