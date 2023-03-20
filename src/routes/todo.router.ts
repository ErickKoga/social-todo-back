import { FastifyInstance } from 'fastify';

import { TodoController } from '../controllers/todo.controller';
import {
  createTodoSchema,
  deleteTodoSchema,
  getAllTodoSchema,
  getTodoSchema,
  updateTodoSchema,
} from '../schemas/todo.schema';

export default async function todoRouter(server: FastifyInstance) {
  const todoController = new TodoController();

  server.route({
    method: 'POST',
    url: '',
    schema: createTodoSchema,
    handler: todoController.createTodo.bind(todoController),
  });

  server.route({
    method: 'GET',
    url: '',
    schema: getAllTodoSchema,
    handler: todoController.getAllTodo.bind(todoController),
  });

  server.route({
    method: 'GET',
    url: '/:id',
    schema: getTodoSchema,
    handler: todoController.getTodoById.bind(todoController),
  });

  server.route({
    method: 'PATCH',
    url: '/:id',
    schema: updateTodoSchema,
    handler: todoController.updateTodo.bind(todoController),
  });

  server.route({
    method: 'DELETE',
    url: '/:id',
    schema: deleteTodoSchema,
    handler: todoController.deleteTodo.bind(todoController),
  });
}
