export const createTodoSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['ownerId', 'title'],
    properties: {
      ownerId: { type: 'string', format: 'uuid' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string', minLength: 0, maxLength: 255 },
      completed: { type: 'boolean' },
    },
  },
  response: {
    '201': {
      type: 'object',
      additionalProperties: false,
      required: [
        'id',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        ownerId: { type: 'string', format: 'uuid' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 0, maxLength: 255 },
        completed: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export const getTodoSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      required: [
        'id',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        ownerId: { type: 'string', format: 'uuid' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 0, maxLength: 255 },
        completed: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export const getAllTodoSchema = {
  response: {
    '200': {
      type: 'array',
      additionalProperties: false,
      required: [
        'id',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        ownerId: { type: 'string', format: 'uuid' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 0, maxLength: 255 },
        completed: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export const updateTodoSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      ownerId: { type: 'string', format: 'uuid' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string', minLength: 0, maxLength: 255 },
      completed: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      deletedAt: { type: 'string', format: 'date-time' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      required: [
        'id',
        'title',
        'description',
        'completed',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
      properties: {
        id: { type: 'string', format: 'uuid' },
        ownerId: { type: 'string', format: 'uuid' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 0, maxLength: 255 },
        completed: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export const deleteTodoSchema = {
  param: {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '404': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
    '500': {
      type: 'object',
      additionalProperties: false,
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};
