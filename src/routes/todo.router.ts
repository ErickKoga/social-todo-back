import { FastifyInstance } from 'fastify';

import { TodoController } from '../controllers/todo.controller';
import {
  createTodoSchema,
  deleteTodoSchema,
  getAllTodoSchema,
  getTodoSchema,
  updateTodoSchema,
} from '../schemas/todo.schema';

async function todoRouter(fastify: FastifyInstance) {
  const todoController = new TodoController();

  fastify.route({
    method: 'POST',
    url: '',
    schema: createTodoSchema,
    handler: todoController.createTodo.bind(todoController),
  });

  fastify.route({
    method: 'GET',
    url: '',
    schema: getAllTodoSchema,
    handler: todoController.getAllTodo.bind(todoController),
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getTodoSchema,
    handler: todoController.getTodoById.bind(todoController),
  });

  fastify.route({
    method: 'PATCH',
    url: '/:id',
    schema: updateTodoSchema,
    handler: todoController.updateTodo.bind(todoController),
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: deleteTodoSchema,
    handler: todoController.deleteTodo.bind(todoController),
  });
}

export default todoRouter;
