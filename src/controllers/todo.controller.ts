import { Todo } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import { replyContent } from "../helpers/reply-content";
import { ITodoRequest } from "../interfaces/todo.interface";
import { TodoService } from "../services/todo.service";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  /**
   * This is a controller method that creates a todo, given the data specified in the interface.
   * @param request contains the incoming HTTP request, which includes the Idata specified in the interface in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async createTodo(
    request: FastifyRequest<{
      Body: ITodoRequest;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const newTodo: ITodoRequest = request.body;
      const todo: Todo = await this.todoService.createTodo(newTodo);
      reply.status(200).send(todo);
      return;
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that reads all todo.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async getAllTodo(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const todo: Todo[] = await this.todoService.getAllTodo();
      reply.status(200).send(todo);
      return;
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that reads a todo, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the todo to read in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async getTodoById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const todo: Todo | null = await this.todoService.getTodoById(
        request.params.id
      );

      if (!todo) {
        replyContent(reply, 404, "Todo not found.");
        return;
      }

      reply.status(200).send(todo);
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that updates a todo, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the todo to update in the URL parameters and the data to be replaced in the URL body.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async updateTodo(
    request: FastifyRequest<{ Params: { id: string }; Body: ITodoRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      // Try to update the todo.
      const todo: Todo | null = await this.todoService.updateTodo(
        request.params.id,
        request.body
      );
      // If it does not find a match, return with a not found exception.
      if (!todo) {
        replyContent(reply, 404, "Todo not found.");
        return;
      }
      // Return success, and an instance of the updated todo.
      reply.status(200).send(todo);
    } catch (error: any) {
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }

  /**
   * This is a controller method that deletes a todo, given an ID.
   * @param request contains the incoming HTTP request, which includes the ID of the todo to delete in the URL parameters.
   * @param reply contains The HTTP response object that will be sent back to the client.
   */
  public async deleteTodo(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      await this.todoService.deleteTodo(request.params.id);
      // Return a success.
      replyContent(
        reply,
        200,
        `Todo with ID ${request.params.id} successfully deleted.`
      );
    } catch (error: any) {
      // If a todo is not found, return a not found exception.
      if (error.code && error.code === "P2025") {
        console.error(error);
        replyContent(
          reply,
          404,
          `Todo with ID ${request.params.id} not found.`
        );
      }
      // If any error occurs, return an internal error.
      console.error(error);
      replyContent(reply, 500, "Internal server exception.");
    }
  }
}
